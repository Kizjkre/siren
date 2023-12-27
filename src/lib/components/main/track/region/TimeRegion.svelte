<!-- TODO: Hitbox -->

<script lang="ts">
  import { derived, type Readable, type Writable } from 'svelte/store';
  import type { Region } from '$lib/util/definitions/client/region';
  import { type ScaleLinear, scaleLinear } from 'd3-scale';
  import data from '$lib/stores/data';
  import width from '$lib/stores/width';
  import type { MouseEventHandler } from 'svelte/elements';
  import displacement from '$lib/util/drag/displacement';
  import round from '$lib/util/drag/round';
  // noinspection TypeScriptCheckImport
  import IconCircleX from '~icons/tabler/circle-x';
  import { createEventDispatcher, type EventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';
  import duration from '$lib/stores/duration';
  import { handleDragLeave, handleDragOver, handleDrop } from '$lib/util/drag/mapping';
  import { Types } from '$lib/util/definitions/client/types.d';
  import Alert from '$lib/components/util/Alert.svelte';
  import { ntoq } from '$lib/util/types';

  type CustomScaleLinear<T, U> = (d: T) => U;

  export let region: Region;
  export let hovering: boolean = false;

  const column: Writable<any[]> = region.data;
  const rtype: Writable<Types> = region.type;

  let alert: boolean = false;

  const rects: RegionPoint[] = [];

  const offset: Writable<number> = region.offset;
  const w: Readable<number> = derived<[Writable<number>, Writable<any[]>], number>(
    [width, column],
    ([width, column]: [number, any[]]): number => column.reduce((a: number, v: number): number => a + v) * width
  );

  const dispatch: EventDispatcher<None> = createEventDispatcher();

  const forward: MouseEventHandler<HTMLButtonElement> = (): any => dispatch('remove');

  const handleMouseDown: MouseEventHandler<HTMLButtonElement> = (): any => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }

  const handleMouseMove: MouseEventHandler<any> = (e: MouseEvent): any => {
    $offset = Math.max(0, $offset + e.movementX / $width);
    if (displacement($offset, 1) < 0.03) $offset = round($offset, 1);
    else if (displacement($offset, 1 / 4) < 0.02) $offset = round($offset, 1 / 4);
  }

  const handleMouseUp: MouseEventHandler<any> = (): any => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  if ($rtype === Types.NOMINAL) {
    !hovering && (alert = true);
    $column = ntoq($column);
  }

  $: {
    let dist: number = 0;
    const x: CustomScaleLinear<any, number> = (d: any): number => {
      const pos: number = dist * $width;
      dist += d;
      return pos;
    };

    const y: ScaleLinear<number, number> = scaleLinear<number, number>()
      .domain([Math.min(...$column), Math.max(...$column)])
      .range([50 - 2.5, 25]);

    $column.forEach((d: any, i: number): RegionPoint => rects[i] = { x: x(d), y: y(d)!, d });
  }

  let sum: number = -1;
  $: if ((sum = $column.reduce((a: number, v: number): number => a + v) + $offset + 4) > $duration)
    $duration = round(sum, 4);
</script>

<button
  class="absolute active:cursor-grabbing bg-blue-100 box-border cursor-grab h-full rounded-xl"
  on:dragleave|capture|preventDefault|stopPropagation={ handleDragLeave }
  on:dragover|capture|preventDefault|stopPropagation={ handleDragOver }
  on:drop|capture|preventDefault|stopPropagation={ handleDrop(region) }
  on:mousedown={ handleMouseDown }
  style:left="{ $offset * $width }px"
  style:width="{ $w }px"
  transition:fade={ { duration: 100 } }
>
  <span class="absolute flex gap-2 items-center left-2 text-xs">
    <button class="hover:text-red-400 text-blue-600" on:click|stopPropagation={ forward }>
      <IconCircleX class="h-3 w-3" />
    </button>
    <span class="text-blue-900">{ $data[region.source.id].name } / { region.source.column }</span>
  </span>
  <svg class="h-full" width={ $w }>
    { #each rects as { x, y, d } }
      { #key y }
        <rect
          class="cursor-pointer fill-blue-900 hover:fill-blue-600"
          height="2.5"
          transition:fade
          width={ (d || 0) * $width }
          { x }
          y={ y - 2.5 }
        />
      { /key }
    { /each }
  </svg>
</button>

{ #if alert }
  <Alert>
    Placing nominal data <b><kbd>{ region.source.column }</kbd></b> of dataset <b><kbd>{ $data[region.source.id].name }</kbd></b> in a quantitative time parameter.
    The data has been automatically casted to a quantitative type.
  </Alert>
{ /if }
