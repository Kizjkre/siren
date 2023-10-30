<script lang="ts">
  import tracks from '$lib/stores/tracks';
  // noinspection TypeScriptCheckImport
  import IconCircleX from '~icons/tabler/circle-x';
  import type { ChangeEventHandler, MouseEventHandler } from 'svelte/elements';
  import type { Writable } from 'svelte/store';
  import type { Track } from '$lib/util/definitions/tracks';
  import { handleDragLeave, handleDragOver, handleDrop } from '$lib/util/drag/synth';
  import synths from '$lib/stores/synths';
  import { onSandboxReturn, useSandbox } from '$lib/util/sandbox/useSandbox';
  // @ts-ignore
  import demo from '$lib/util/sandbox/action/demo?raw';

  export let id: number;

  const track: Track = $tracks[id];
  const name: Writable<string> = track.name;
  const synth: Writable<number> = track.synth;
  const view: Writable<string> = track.view;

  const handleClick: MouseEventHandler<HTMLButtonElement> = (): any => tracks.remove(id);
  const handleChange: ChangeEventHandler<HTMLSelectElement> = (e: Event): any =>
    $view = (e.target as HTMLOptionElement).value;

  const handleDemo: EventListener = (e: Event): void => {
      if (!e.isTrusted) return;
      useSandbox(`demo-${ $synths[$synth].name }`, { action: demo, script: $synths[$synth].code });
    };

</script>

<div class="bg-white border-x flex flex-col gap-4 h-full left-0 px-2 py-1 shrink-0 sticky w-track-header z-[1]">
  <div class="flex">
    <input bind:value={ $name } class="font-bold outline-none w-full" name="track-name" type="text" />
    <button class="hover:text-red-400" on:click={ handleClick }>
      <IconCircleX />
    </button>
  </div>
  <p class="pl-4 text-sm">
    Synth:
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
  <div class="flex gap-2 pl-4 text-sm">
    <label for="view-{ id }">View:</label>
    <select class="outline-none" id="view-{ id }" on:change={ handleChange }>
      { #each Object.keys($synths[$synth].parameters.timbral) as parameter }
      	<option value={ parameter }>{ parameter }</option>
      { /each }
    </select>
  </div>
</div>
