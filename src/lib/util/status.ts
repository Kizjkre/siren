import { get } from 'svelte/store';
// @ts-ignore
import action from '$lib/util/sandbox/action/play?raw';
import synths from '$lib/stores/synths';
import timeline from '$lib/util/timeline';
import tracks from '$lib/stores/tracks';
import sandbox from '$lib/stores/sandbox';
import status from '$lib/stores/status';
import { Status, type StatusChange } from '$lib/util/definitions/client/status.d';
import { io } from 'socket.io-client';
import recordStore from '$lib/stores/record';

export const end: StatusChange = (): any => {
  get(recordStore)?.disconnect();

  status.set(Status.stop);
};

/**
 * Pauses the execution of the program.
 *
 * @return {any} - The return value is not specified.
 */
export const pause: StatusChange = (): any => {
  sandbox.send('play', { action: 'pause' });

  status.set(Status.pause);
};

/**
 * Executes the play function.
 *
 * @return {any} The result of the execution.
 */
export const play: StatusChange = (): any => {
  if (get(status) === Status.pause) {
    sandbox.send('play', { action: 'resume' })
  } else {
    const t: Timeline[] = timeline();

    sandbox.add('play', {
      action,
      address: 'play',
      data: { action: 'play', timeline: t, gain: 1 },
      scripts: Object.fromEntries(t.map((timeline: Timeline, i: number): [string, string] => [`userscript-${ i }`, get(synths)[timeline.synth].code]))
    });
  }

  status.set(Status.play);
};

export const record: StatusChange = async (): Promise<any> => {
  const jwt: string = localStorage.getItem('access') ?? await (async (): Promise<string> => {
    const token = (
      await (
        await fetch('/workstation/auth', {
          method: 'post',
          body: JSON.stringify({ addr: Math.random() })
        })
      ).json()
    ).access;

    localStorage.setItem('access', token);

    return token;
  })();

  recordStore.set(
    io(`${ window.location.protocol === 'https:' ? 'wss' : 'ws' }://${ window.location.hostname }:3001`)
  );

  get(recordStore).emit('access', jwt);
  get(recordStore).on(`/${ jwt }`, (message: string): any => {
    console.log(message);
  });

  status.set(Status.record);
};

/**
 * Stops the execution of the program.
 *
 * @return {any} This function does not return anything.
 */
export const stop: StatusChange = (): any => {
  Object.keys(get(tracks)).forEach((id: string): any => {
    sandbox.send('play', { action: 'stop' });
    sandbox.remove('play');
  });

  status.set(Status.stop);
};
