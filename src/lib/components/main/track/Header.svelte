<script lang="ts">
  import tracks from '$lib/stores/tracks';
  import { IconCircleX } from '@tabler/icons-svelte';
  import type { MouseEventHandler } from 'svelte/elements';
  import type { Writable } from 'svelte/store';
  import type { Track } from '$lib/util/definitions/tracks';

  export let id: number;

  const track: Track = $tracks[id];
  const name: Writable<string> = track.name;

  const handleClick: MouseEventHandler<HTMLButtonElement> = (): void => tracks.remove(id);
</script>

<div class="bg-white border-x flex flex-col h-full left-0 px-2 py-1 shrink-0 sticky w-track-header z-[1]">
  <div class="flex">
    <input bind:value={ $name } class="font-bold outline-none w-full" name="track-name" type="text" />
    <button class="hover:text-red-400" on:click={ handleClick }>
      <IconCircleX />
    </button>
  </div>
  <p class="text-sm">Synth: asdf</p>
  <div class="flex text-sm">
    <label for="view-{ id }">View:</label>
    <select class="outline-none" id="view-{ id }">
      <option>asdf</option>
      <option>asdf</option>
      <option>asdf</option>
    </select>
  </div>
</div>
