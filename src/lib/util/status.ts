import { get } from 'svelte/store';
import { createSandbox } from '$lib/util/sandbox/useSandbox';
// @ts-ignore
import process from '$lib/util/sandbox/process/processPlay?raw';
import synths from '$lib/stores/synths';
import timeline from '$lib/util/timeline';

export const pause = (): any => {};

export const play = (): any =>
  timeline((timeline: Timeline): any => {
    createSandbox('play', get(synths)[timeline.synth].code, process, timeline);
  });

export const stop = (): any => {};
