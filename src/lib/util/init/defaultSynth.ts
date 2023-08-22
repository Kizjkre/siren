// @ts-ignore
import synth from '$lib/util/init/defaultSynthCode?raw';
import { onMount } from 'svelte';
import synths from '$lib/stores/synths';

const defaultSynth: () => void = () => onMount((): void =>
  synths.add('Default', synth)
);

export default defaultSynth;
