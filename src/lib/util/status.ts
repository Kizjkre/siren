import { get } from 'svelte/store';
import { useSandbox } from '$lib/util/sandbox/useSandbox';
// @ts-ignore
import action from '$lib/util/sandbox/action/play?raw';
import synths from '$lib/stores/synths';
import timeline from '$lib/util/timeline';

enum PlayState {
  play = 'play',
  resume = 'resume'
}

let ps: PlayState = PlayState.play;
let i: number = 0;

/**
 * Pauses the execution of the program.
 *
 * @return {any} - The return value is not specified.
 */
export const pause = (): any => {
  Array(i).fill(0).map((_, i) => useSandbox(`play-${ i }`, { data: { action: 'pause' } }));
  ps = PlayState.resume;
};

/**
 * Executes the play function.
 *
 * @return {any} The result of the execution.
 */
export const play = (): any => {
  if (ps === PlayState.resume) {
    Array(i).fill(0).map((_, i) => useSandbox(`play-${ i }`, { data: { action: 'resume' } }));
    return;
  }

  timeline((timeline: Timeline): any => {
    useSandbox(`play-${ i++ }`, {
      action,
      data: { action: 'play', timeline, gain: 1 },
      script: get(synths)[timeline.synth].code
    });
  });
};

/**
 * Stops the execution of the program.
 *
 * @return {any} This function does not return anything.
 */
export const stop = (): any => {
  Array(i).fill(0).map((_, i) => useSandbox(`play-${ i }`, { data: { action: 'stop' } }));
  ps = PlayState.play;
  i = 0;
};
