import { get } from 'svelte/store';
import { createSandbox } from '$lib/util/sandbox/useSandbox';
// @ts-ignore
import process from '$lib/util/sandbox/process/processPlay?raw';
import synths from '$lib/stores/synths';
import timeline from '$lib/util/timeline';

let i: number = 0;

export const pause = (): any => {
  Array(i).fill(null).forEach((_: any, j: number): any => {
    createSandbox(`play-${ j }`, '', '', 'pause');
  });
};

export const play = (): any =>
  timeline((timeline: Timeline): any => {
    createSandbox(`play-${ i++ }`, get(synths)[timeline.synth].code, process, timeline);
  });

export const stop = (): any => {};
