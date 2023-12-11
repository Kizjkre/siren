<script lang="ts">
  import data from '$lib/stores/data.js';
  // noinspection TypeScriptCheckImport
  import IconTableRow from '~icons/tabler/table-row';
  import type { DSVParsedArray } from 'd3-dsv';
  import { slide } from 'svelte/transition';
  import { handleDragStart as handleDragStartCore } from '$lib/util/drag/data';
  import portal from '$lib/actions/portal';
  import { derived, type Readable } from 'svelte/store';
  import type { DragEventHandler } from 'svelte/elements';
  import Region from '$lib/components/main/track/region/Region.svelte';
  import type { Region as RegionInterface } from '$lib/util/definitions/client/region';
  import width from '$lib/stores/width';
  import region from '$lib/stores/region';
  import type { EventHandlerCreator } from '$lib/util/definitions/client/listener';

  type StrongDragEvent = DragEvent & { currentTarget: EventTarget & HTMLButtonElement; };

  export let id: number;

  const d: { name: string, data: DSVParsedArray<any> } = $data[id];

  let dragging: boolean = false;
  let image: HTMLImageElement;
  let x: number = 0;
  let y: number = 0;
  let r: RegionInterface;
  let column: string;
  const w: Readable<number> = derived(width, (width: number): number => column?.length * width / 4);

  const handleDragStart: EventHandlerCreator<[string], DragEventHandler<HTMLButtonElement>> =
    (c: string) => (e: StrongDragEvent): any => {
      dragging = true;
      column = c;
      e.dataTransfer!.setDragImage(image, 0, 0);

      r = region({ source: { id, column } });

      handleDragStartCore(id, column)(e);
    };

  const handleDrag: DragEventHandler<HTMLButtonElement> = (e: DragEvent): any => {
    if (!dragging) return;

    x = e.clientX - 50;
    y = e.clientY - 50;
  };

  const handleDragEnd: DragEventHandler<HTMLButtonElement> = (): any =>
    dragging = false;
</script>

<!-- REF: https://stackoverflow.com/a/51697038 -->
<svelte:body on:dragover|preventDefault />

<div class="flex flex-col gap-1 ml-4 mt-2" transition:slide>
  { #each d.data.columns as column }
    <div class="flex justify-between">
      <button
        class="after:border-b-blue-600 active:cursor-grabbing cursor-grab flex gap-2 items-center link"
        draggable="true"
        on:drag={ handleDrag }
        on:dragstart={ handleDragStart(column) }
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

{ #if dragging }
  <div
    class="absolute h-[100px] left-0 pointer-events-none top-0 z-10"
    style:transform="translate({ x }px, { y }px)"
    style:width="{ $w }px"
    use:portal
  >
    <Region region={ r } />
  </div>
{ /if }

<img
  alt="Data drag clearfix"
  bind:this={ image }
  class="fixed"
  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
  use:portal
/>
