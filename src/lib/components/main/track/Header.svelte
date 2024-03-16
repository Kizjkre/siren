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
  import type { KeyboardEventHandler, MouseEventHandler } from 'svelte/elements';
  import type { Writable } from 'svelte/store';
  import type { Track } from '$lib/util/definitions/tracks';
  import { handleDragLeave, handleDragOver, handleDrop } from '$lib/util/drag/synth';
  import synths from '$lib/stores/synths';
  // @ts-ignore
  import demo from '$lib/util/sandbox/action/demo?raw';
  import status from '$lib/stores/status';
  import sandbox from '$lib/stores/sandbox';
  import trackSelect from '$lib/stores/trackSelect';
  import { Status } from '$lib/util/definitions/status.d';

  export let id: number;

  const track: Track = $tracks[id];
  const gain: Writable<number> = track.gain;
  const name: Writable<string> = track.name;
  const synth: Writable<number> = track.synth;
  const view: Writable<string> = track.view;

  let prevState: Status = $status;

  const handleClick: MouseEventHandler<HTMLButtonElement> = (): any => tracks.remove(id);

  const handleDemo: EventListener = (e: Event): void => {
    if (!e.isTrusted) return;
    sandbox.add(`demo-${ id }`, {
      action: demo,
      scripts: { userscript: $synths[$synth].code }
    });
    sandbox.read(`demo-${ id }`, undefined);
  };

  const handleGain: MouseEventHandler<HTMLButtonElement> = (): any => $gain = $gain === 0 ? 1 : 0;

  const handleSelect: MouseEventHandler<HTMLDivElement> & KeyboardEventHandler<HTMLDivElement> =
    (): any => $trackSelect = $trackSelect === id ? -1 : id;

  $: {
    if ($status === Status.play && $status === prevState)
      sandbox.send('play', { action: 'gain', payload: { gain: $gain, id } });
    else if ($status === Status.play)
      sandbox
        .read('play', 'gain', false)
        .then(() => sandbox.send('play', { action: 'gain', payload: { gain: $gain, id } }));

    prevState = $status;
  }
</script>

<div
  class="border-x cursor-pointer flex flex-col gap-4 h-full left-0 px-2 py-1 shrink-0 sticky transition w-track-header z-[1]"
  class:bg-gray-100={ $trackSelect === id }
  class:bg-white={ $trackSelect !== id }
  on:click={ handleSelect }
  on:keypress={ handleSelect }
  role="button"
  tabindex="-1"
>
  <div class="flex">
    <input
      bind:value={ $name }
      class="bg-transparent font-bold outline-none w-full"
      on:keydown|stopPropagation
      on:keypress|stopPropagation
      name="track-name"
      type="text"
    />
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
    <select bind:value={ $view } class="bg-transparent outline-none" id="track-view-{ id }">
      { #each Object.entries($synths[$synth].parameters.timbral) as [parameter, type] }
      	<option value={ parameter }>{ parameter } ({ type === 'quantitative' ? 'Q' : 'N' })</option>
      { /each }
    </select>
  </div>

  <form class="flex gap-2">
    <button on:click|stopPropagation={ handleGain }>
      { #if $gain === 0 }
        <IconVolumeOff />
      { :else if $gain < 0.5 }
        <IconVolume2 />
      { :else }
        <IconVolume />
      { /if }
    </button>
    <input bind:value={ $gain } id="track-{ id }-gain" max="1" min="0" step="any" type="range" />
  </form>
</div>
