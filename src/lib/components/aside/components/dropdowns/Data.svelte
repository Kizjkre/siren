<script lang="ts">
  import data from '$lib/stores/data.js';
  // noinspection TypeScriptCheckImport
  import IconTableRow from '~icons/tabler/table-row';
  import type { DSVParsedArray } from 'd3-dsv';
  import { slide } from 'svelte/transition';
  import { handleDragStart as handleDragStartCore } from '$lib/util/drag/data';
  import Region from '$lib/components/main/track/region/Region.svelte';
  import portal from '$lib/actions/portal';
  import { writable } from 'svelte/store';
  import type { DragEventHandler } from 'svelte/elements';

  type StrongDragEvent = DragEvent & { currentTarget: EventTarget & HTMLButtonElement; };

  export let id: number;

  const d: { name: string, data: DSVParsedArray<{}> } = $data[id];

  let dragging: boolean = false;
  let column: string;
  let image: HTMLImageElement;
  let x: number = 0;
  let y: number = 0;

  const handleDragStart = (id: number, c: string) => (e: StrongDragEvent): void => {
    dragging = true;
    column = c;
    handleDragStartCore(id, c)(e);
    e.dataTransfer!.setDragImage(image, 0, 0);
  };

  const handleDrag: DragEventHandler<HTMLButtonElement> = (e: DragEvent): void => {
    if (!dragging) return;

    x = e.clientX + 10;
    y = e.clientY - 50;
  };

  const handleDragEnd: DragEventHandler<HTMLButtonElement> = (): void => {
    dragging = false;
  }
</script>

<div class="flex flex-col gap-1 ml-4 mt-2" transition:slide>
  { #each d.data.columns as column }
    <div class="flex justify-between">
      <button
        class="after:border-b-blue-600 active:cursor-grabbing cursor-grab flex gap-2 items-center link"
        draggable="true"
        on:drag={ handleDrag }
        on:dragstart={ handleDragStart(id, column) }
        on:dragend={ handleDragEnd }
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

<!-- NOTE: Refactor -->
{ #if dragging }
  <div class="absolute h-[100px] left-0 top-0 z-10" style:transform="translate({ x }px, { y }px)" style:width="{ d.data.map((row) => row[column]).length * 20 }px" use:portal>
    <Region region={ {
      data: writable(d.data.map((row) => row[column])),
      offset: writable(0),
      source: { id, column }
    } } />
  </div>
{ /if }

<img
  alt="Data drag clearfix"
  bind:this={ image }
  class="fixed"
  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
  use:portal
/>
