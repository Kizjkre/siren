<script lang="ts">
  import duration from '$lib/stores/duration.js';
  import width from '$lib/stores/width';
  // noinspection TypeScriptCheckImport
  import IconZoomIn from '~icons/tabler/zoom-in';
  // noinspection TypeScriptCheckImport
  import IconZoomOut from '~icons/tabler/zoom-out';
  import type { MouseEventHandler } from 'svelte/elements';

  const handleZoomIn: MouseEventHandler<HTMLButtonElement> = (): any => $width = Math.min(300, $width + 10);
  const handleZoomOut: MouseEventHandler<HTMLButtonElement> = (): any => $width = Math.max(20, $width - 10);

  $: ($width < 50 && $duration < 40) && ($duration = 48);
</script>

<div class="border-b box-border flex">
  <div class="bg-white flex gap-2 items-center justify-center left-0 px-2 sticky w-track-header z-[1]">
    <button class="cursor-zoom-out h-5 w-5" on:click={ handleZoomOut }>
      <IconZoomOut class="h-5 w-5" />
    </button>
    <input bind:value={ $width } max="300" min="20" type="range" />
    <button class="cursor-zoom-in h-5 w-5" on:click={ handleZoomIn }>
      <IconZoomIn class="h-5 w-5" />
    </button>
  </div>
  <div class="flex grow">
    { #each Array($duration).fill(null) as _, i }
      <div class="border-l flex items-end relative h-8" style:width="{ $width }px">
        { #each Array(4).fill(null) as _ }
        	<div class="border-l first:border-l-0 h-4" style:width="{ $width / 4 }px" />
        { /each }
        <p class="absolute ml-1 top-0" class:text-xs={ $width < 50 }>{ i }</p>
      </div>
    { /each }
  </div>
</div>
