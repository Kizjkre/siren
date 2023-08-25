// @ts-ignore
import synth from '$lib/util/init/defaultSynthCode?raw';
import { onMount } from 'svelte';
import synths from '$lib/stores/synths';
import { get } from 'svelte/store';

const defaultSynth: Function = (): any => onMount((): any =>
  !(0 in get(synths)) && synths.add('Default', synth, true)
);

export default defaultSynth;
