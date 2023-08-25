<script lang="ts">
  import data from '$lib/stores/data.js';
  import { IconTableRow } from '@tabler/icons-svelte';
  import type { DSVParsedArray } from 'd3-dsv';
  import { slide } from 'svelte/transition';
  import { handleDragStart } from '$lib/util/drag/data';

  export let id: number;

  const d: { name: string, data: DSVParsedArray<{}> } = $data[id];
</script>

<div class="flex flex-col gap-1 ml-4 mt-2" transition:slide>
  { #each d.data.columns as column }
    <div class="flex justify-between">
      <button
        class="after:border-b-blue-600 active:cursor-grabbing cursor-grab flex gap-2 items-center link"
        draggable="true"
        on:dragstart={ handleDragStart(id, column) }
      >
        <IconTableRow class="h-4 w-4" />
        { column }
      </button>
      <p class="border border-blue-600 flex h-6 items-center justify-center rounded text-xs w-6">
        { #if typeof d.data[0][column] === 'string' }
          N
        { :else if typeof d.data[0][column] === 'number' }
          Q
        { /if }
      </p>
    </div>
  { /each }
</div>
