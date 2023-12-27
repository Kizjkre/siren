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
  import TimeRegion from '$lib/components/main/track/region/TimeRegion.svelte';
  import { Types } from '$lib/util/definitions/client/types.d';
  import { type } from '$lib/util/types';

  type StrongDragEvent = DragEvent & { currentTarget: EventTarget & HTMLButtonElement; };

  export let id: number;

  const d: { name: string, data: DSVParsedArray<any> } = $data[id];

  let column: string;
  let dragging: boolean = false;
  let hovering: boolean = false;
  let image: HTMLImageElement;
  let r: RegionInterface;
  let time: boolean = false;
  let x: number = 0;
  let y: number = 0;
  const w: Readable<number> = derived(width, (width: number): number => column?.length * width / 4);

  const handleDragStart: EventHandlerCreator<[string | number | symbol], DragEventHandler<HTMLButtonElement>> =
    (c: string | number | symbol) => (e: StrongDragEvent): any => {
      dragging = true;
      column = c as string;
      e.dataTransfer!.setDragImage(image, 0, 0);

      r = region({ source: { id, column } });

      handleDragStartCore(id, column)(e);
    };

  const handleDrag: DragEventHandler<HTMLButtonElement> = (e: DragEvent): any => {
    if (!dragging || hovering) return;
    x = e.clientX - 50;
    y = e.clientY - 50;
  };

  const handleDragEnd: DragEventHandler<HTMLButtonElement> = (): any =>
    dragging = false;

  const handleDragOver: DragEventHandler<HTMLElement> = (e: DragEvent): any => {
    const target: HTMLElement = e.target as HTMLElement;
    hovering = target.getAttribute('data-accept') === 'siren/region';
    time = target.getAttribute('data-type') === 'time';
    if (!hovering) return;

    const { left, top }: DOMRect = target.getBoundingClientRect();

    x = e.clientX - 50 - left < 0 ? left : e.clientX - 50;
    y = top;
  };
</script>

<!-- REF: https://stackoverflow.com/a/51697038 -->
<svelte:body on:dragover|preventDefault={ handleDragOver } />

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
        { #if type(d.data.map(datum => datum[column])) === Types.NOMINAL }
          N
        { :else }
          Q
        { /if }
      </p>
    </div>
  { /each }
</div>

{ #if dragging }
  <div
    class="absolute left-0 pointer-events-none top-0 z-10"
    style:height="{ time ? 50 : 100 }px"
    style:transform="translate({ x }px, { y }px)"
    style:width="{ $w }px"
    use:portal
  >
    { #if time }
      <TimeRegion hovering={ true } region={ r } />
    { :else }
      <Region region={ r } />
    { /if }
  </div>
{ /if }

<!-- NOTE: Transparent pixel for clearing out drag image. -->
<img
  alt="Data drag clearfix"
  bind:this={ image }
  class="fixed"
  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
  use:portal
/>
