import { get } from 'svelte/store';
// @ts-ignore
import action from '$lib/util/sandbox/action/play?raw';
import synths from '$lib/stores/synths';
import timeline from '$lib/util/timeline';
import tracks from '$lib/stores/tracks';
import sandbox from '$lib/stores/sandbox';
import status from '$lib/stores/status';
import { Status, type StatusChange } from '$lib/util/definitions/client/status.d';
import { io, Socket } from 'socket.io-client';

/**
 * Pauses the execution of the program.
 *
 * @return {any} - The return value is not specified.
 */
export const pause: StatusChange = (): any => {
  Object.keys(get(tracks)).forEach((id: string): any => sandbox.send(`play-${ id }`, { action: 'pause' }));
};

/**
 * Executes the play function.
 *
 * @return {any} The result of the execution.
 */
export const play: StatusChange = (): any => {
  if (get(status) === Status.pause) {
    Object.keys(get(tracks)).forEach((id: string): any => sandbox.send(`play-${ id }`, { action: 'resume' }));
    return;
  }

  timeline((id: number, timeline: Timeline): any =>
    sandbox.add(`play-${ id }`, {
      action,
      data: { action: 'play', timeline, gain: 1 },
      script: get(synths)[timeline.synth].code
    })
  );
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

  const socket: Socket =
    io(`${ window.location.protocol === 'https:' ? 'wss' : 'ws' }://${ window.location.hostname }:3001`);

  socket.emit('access', jwt);
  socket.on(`/${ jwt }`, (message: string): any => {
    console.log(message);
  });
};

/**
 * Stops the execution of the program.
 *
 * @return {any} This function does not return anything.
 */
export const stop: StatusChange = (): any => {
  Object.keys(get(tracks)).forEach((id: string): any => {
    sandbox.send(`play-${ id }`, { action: 'stop' });
    sandbox.remove(`play-${ id }`);
  });
};
