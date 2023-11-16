import { get } from 'svelte/store';
// @ts-ignore
import action from '$lib/util/sandbox/action/play?raw';
import synths from '$lib/stores/synths';
import timeline from '$lib/util/timeline';
import tracks from '$lib/stores/tracks';
import sandbox from '$lib/stores/sandbox';
import status from '$lib/stores/status';
import { Status } from '$lib/util/definitions/status';

/**
 * Pauses the execution of the program.
 *
 * @return {any} - The return value is not specified.
 */
export const pause = (): any => {
  Object.keys(get(tracks)).forEach((id: string): any => sandbox.send(`play-${ id }`, { action: 'pause' }));
};

/**
 * Executes the play function.
 *
 * @return {any} The result of the execution.
 */
export const play = (): any => {
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

/**
 * Stops the execution of the program.
 *
 * @return {any} This function does not return anything.
 */
export const stop = (): any => {
  Object.keys(get(tracks)).forEach((id: string): any => {
    sandbox.send(`play-${ id }`, { action: 'stop' });
    sandbox.remove(`play-${ id }`);
  });
};
