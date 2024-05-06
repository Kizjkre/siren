<script lang="ts">
  import { get, type Writable } from 'svelte/store';
  import type { Region } from '$lib/util/definitions/region';
  import { type ScaleBand, scaleBand, type ScaleLinear, scaleLinear } from 'd3-scale';
  import data from '$lib/stores/data';
  import width from '$lib/stores/width';
  import type { DragEventHandler, FocusEventHandler, MouseEventHandler } from 'svelte/elements';
  import displacement from '$lib/util/drag/displacement';
  import round from '$lib/util/drag/round';
  // noinspection TypeScriptCheckImport
  import IconCircleX from '~icons/tabler/circle-x';
  import { createEventDispatcher, type EventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';
  import duration from '$lib/stores/duration';
  import {
    handleDragLeave as handleMappingDragLeave,
    handleDragOver as handleMappingDragOver,
    handleDrop as handleMappingDrop
  } from '$lib/util/drag/mapping';
  import {
    handleDragLeave as handleTimeDragLeave,
    handleDragOver as handleTimeDragOver,
    handleDrop as handleTimeDrop
  } from '$lib/util/drag/time';
  import Alert from '$lib/components/util/Alert.svelte';
  import { ntoq, qton, type as getType } from '$lib/util/types';
  import { Types } from '$lib/util/definitions/types.d';
  import type { EventHandlerCreator } from '$lib/util/definitions/listener';
  import tracks from '$lib/stores/tracks';

  type CustomScaleLinear<T, U> = (d: T) => U;

  export let id: number | undefined = undefined;
  export let region: Region;
  export let trackId: number | undefined = undefined;
  export let type: Types | undefined = undefined;
  export let view: string | undefined = undefined;

  let popover: HTMLSpanElement;
  let position: [number, number] = [0, 0];
  let text: string;

  const column: Writable<any[]> = region.data;
  const rtype: Writable<Types> = region.type;

  let autoConvert: boolean = false;

  const length: Writable<number> = region.length;
  const link: Writable<number> = region.link;
  let time: Writable<number[]> | undefined;

  const rects: RegionPoint[] = [];

  const offset: Writable<number> = region.offset;
  let w: number = 0;

  const dispatch: EventDispatcher<None> = createEventDispatcher();

  const forward: MouseEventHandler<HTMLButtonElement> = (): any => dispatch('remove');

  const handleDragLeave: DragEventHandler<HTMLButtonElement> = (e: DragEvent): any => {
    handleMappingDragLeave(e);
    handleTimeDragLeave(e);
  };

  const handleDragOver: DragEventHandler<HTMLButtonElement> = (e: DragEvent): any => {
    handleMappingDragOver(e);
    handleTimeDragOver(e);
  };

  const handleDrop: EventHandlerCreator<[Region], DragEventHandler<HTMLButtonElement>> =
    (region: Region): any =>
      (e: DragEvent): void => {
        handleMappingDrop(region)(e);
        handleTimeDrop(trackId, view, id)(e);
      };

  const handleBlurAndMouseLeave: MouseEventHandler<SVGRectElement> & FocusEventHandler<SVGRectElement> = (): any =>
    popover.hidePopover();

  const handleFocusAndMouseEnter: MouseEventHandler<SVGRectElement> & FocusEventHandler<SVGRectElement> = (e: Event): any => {
    const target: HTMLElement = e.target as HTMLElement;

    const { left, top }: DOMRect = target.getBoundingClientRect();

    position[0] = left;
    position[1] = top - 30;

    text = $column[+target.getAttribute('data-index')!];
    popover.showPopover();
  };

  const handleMouseDown: MouseEventHandler<HTMLButtonElement> = (): any => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove: MouseEventHandler<any> = (e: MouseEvent): any => {
    const off: number = Math.max(0, $offset + e.movementX / $width);
    if (Object.entries(get(get(tracks)[trackId!]?.regions.timbral)[view]).some(([i, region]: [number, Region]): boolean => {
      return i !== id && (
        (off > get(region.offset) && off < get(region.offset) + get(region.length)) ||
        (off + $length > get(region.offset) && off + $length < get(region.offset) + get(region.length))
      );
    })) return;

    $offset = off;
    if (displacement($offset, 1) < 0.03) $offset = round($offset, 1);
    else if (displacement($offset, 1 / 4) < 0.02) $offset = round($offset, 1 / 4);

    get(get(tracks)[trackId!]?.regions.time)[view][$link]?.offset.set($offset);
  };

  const handleMouseUp: MouseEventHandler<any> = (): any => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  $: {
    let dist: number = 0;
    const linkX: CustomScaleLinear<any, number> = (d: any): number => {
      const pos: number = dist * $width;
      dist += d;
      return pos;
    };

    const x: ScaleLinear<number, number> = scaleLinear<number, number>()
      .domain([0, $column.length])
      .range([0, $column.length * $width / 4]);

    const y: ScaleLinear<number, number> | ScaleBand<string> = $rtype === Types.QUANTITATIVE ?
      scaleLinear<number, number>()
        .domain([Math.min(...$column), Math.max(...$column)])
        .range([100 - 2.5, 25]) :
      scaleBand<string>()
        .domain($column)
        .range([100 - 2.5, 25]);

    rects.splice(0, rects.length);
    $column.forEach((d: any, i: number): RegionPoint =>
      rects[i] = { x: $link < 0 || i >= $time?.length ? x(i - ($time?.length || 0)) + dist * $width : linkX($time[i]), y: y(d)! }
    );

    w = rects.length === 0 ? 100 : rects.at(-1).x + ($time?.length >= $column.length ? $time[$column.length - 1] * $width : $width / 4);
    $length = w / $width;
  }

  $: ($column.length + $offset * 4 > $duration * 4) &&
    ($duration = round($column.length / 4 + $offset, 4) + 4);

  $: {
    if (type && $rtype !== type) {
      if (type === Types.QUANTITATIVE) $column = ntoq($column);
      else $column = qton($column);

      autoConvert = true;
    }

    $rtype = getType($column);
  }

  $: $link > -1 && (time = get(get(tracks)[trackId!]?.regions.time)[view][$link].data);
  $: $link < 0 && (time = undefined);
</script>

<button
  class="absolute active:cursor-grabbing bg-blue-100 box-border cursor-grab h-full rounded-xl"
  on:dragleave|capture|preventDefault|stopPropagation={ handleDragLeave }
  on:dragover|capture|preventDefault|stopPropagation={ handleDragOver }
  on:drop|capture|preventDefault|stopPropagation={ handleDrop(region) }
  on:mousedown={ handleMouseDown }
  style:left="{ $offset * $width }px"
  style:width="{ w }px"
  transition:fade={ { duration: 100 } }
>
  <span class="absolute flex gap-2 items-center left-2 text-xs">
    <button class="hover:text-red-400 text-blue-600" on:click|stopPropagation={ forward }>
      <IconCircleX class="h-3 w-3" />
    </button>
    <span class="text-blue-900">{ $data[region.source.id].name } / { region.source.column }</span>
  </span>
  <svg class="h-full" width={ w }>
    { #each rects as { x, y }, i }
      { #key y }
        <rect
          class="cursor-pointer fill-blue-900 hover:fill-blue-600"
          data-index={ i }
          height="5"
          on:blur={ handleBlurAndMouseLeave }
          on:focus={ handleFocusAndMouseEnter }
          on:mouseenter={ handleFocusAndMouseEnter }
          on:mouseleave={ handleBlurAndMouseLeave }
          role="cell"
          tabindex="-1"
          transition:fade
          width={ $link < 0 || i >= $time?.length ? $width / 4 : $width * $time[i] }
          x={ x }
          y={ y - 2.5 }
        />
      { /key }
    { /each }
  </svg>
</button>

<!--suppress HtmlUnknownAttribute -->
<span
  bind:this={ popover }
  class="bg-blue-900 m-0 px-2 py-1 rounded text-blue-100 text-xs"
  popover
  style:left={ `${ position[0] }px` }
  style:top={ `${ position[1] }px` }
>
  { text }
</span>

{ #if autoConvert }
  <Alert>
    Placing { $rtype } data <b><kbd>{ region.source.column }</kbd></b> of dataset
    <b><kbd>{ $data[region.source.id].name }</kbd></b> in a { type } parameter.
    The data has been automatically casted to a { type } type.
  </Alert>
{ /if }
