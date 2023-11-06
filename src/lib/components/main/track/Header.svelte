<script lang="ts">
  import tracks from '$lib/stores/tracks';
  // noinspection TypeScriptCheckImport
  import IconBoxMultiple from '~icons/tabler/box-multiple';
  // noinspection TypeScriptCheckImport
  import IconCircleX from '~icons/tabler/circle-x';
  // noinspection TypeScriptCheckImport
  import IconVolume from '~icons/tabler/volume';
  // noinspection TypeScriptCheckImport
  import IconVolume2 from '~icons/tabler/volume-2';
  // noinspection TypeScriptCheckImport
  import IconVolumeOff from '~icons/tabler/volume-off';
  // noinspection TypeScriptCheckImport
  import IconWaveSine from '~icons/tabler/wave-sine';
  import type { ChangeEventHandler, MouseEventHandler } from 'svelte/elements';
  import type { Writable } from 'svelte/store';
  import type { Track } from '$lib/util/definitions/tracks';
  import { handleDragLeave, handleDragOver, handleDrop } from '$lib/util/drag/synth';
  import synths from '$lib/stores/synths';
  // @ts-ignore
  import demo from '$lib/util/sandbox/action/demo?raw';
  import status from '$lib/stores/status';
  import { Status } from '$lib/util/definitions/status';
  import sandbox from '$lib/stores/sandbox';

  export let id: number;

  let gain: number = 1;

  const track: Track = $tracks[id];
  const name: Writable<string> = track.name;
  const synth: Writable<number> = track.synth;
  const view: Writable<string> = track.view;

  const handleClick: MouseEventHandler<HTMLButtonElement> = (): any => tracks.remove(id);
  const handleChange: ChangeEventHandler<HTMLSelectElement> = (e: Event): any =>
    $view = (e.target as HTMLOptionElement).value;

  const handleDemo: EventListener = (e: Event): void => {
    if (!e.isTrusted) return;
    sandbox.add({
      action: demo,
      data: undefined,
      script: $synths[$synth].code
    });
  };

  const handleGain: MouseEventHandler<HTMLButtonElement> = (): any => {
    gain = gain === 0 ? 1 : 0;
  };

  // NOTE: Using setTimeout to wait for the play action to post first. Not sure how to fix,
  //       tried using document.dispatchEvent after useSandbox in status.ts but it doesn't work.
  $: $status === Status.play && setTimeout(() => sandbox.send(`play-${ id }`, { action: 'gain', gain }), 100);
</script>

<div class="bg-white border-x flex flex-col gap-4 h-full left-0 px-2 py-1 shrink-0 sticky w-track-header z-[1]">
  <div class="flex">
    <input bind:value={ $name } class="font-bold outline-none w-full" name="track-name" type="text" />
    <button class="hover:text-red-400" on:click={ handleClick }>
      <IconCircleX />
    </button>
  </div>
  <p class="flex gap-4 items-center pl-4 text-sm">
    <IconWaveSine />
    <button
      class="hover:bg-gray-100 hover:text-blue-600 px-2 py-1 transition"
      on:click={ handleDemo }
      on:dragleave|preventDefault={ handleDragLeave }
      on:dragover|preventDefault={ handleDragOver }
      on:drop|preventDefault={ handleDrop(id) }
    >
      { $synths[$synth].name }
    </button>
  </p>
  <div class="flex gap-4 items-center pl-4 text-sm">
    <label for="track-view-{ id }">
      <IconBoxMultiple />
    </label>
    <select class="outline-none" id="track-view-{ id }" on:change={ handleChange }>
      { #each Object.keys($synths[$synth].parameters.timbral) as parameter }
      	<option value={ parameter }>{ parameter }</option>
      { /each }
    </select>
  </div>

  <form class="flex gap-2">
    <button on:click={ handleGain }>
      { #if gain === 0 }
        <IconVolumeOff />
      { :else if gain < 0.5 }
        <IconVolume2 />
      { :else }
        <IconVolume />
      { /if }
    </button>
    <input bind:value={ gain } id="track-{ id }-gain" max="1" min="0" step="any" type="range" />
  </form>
</div>
