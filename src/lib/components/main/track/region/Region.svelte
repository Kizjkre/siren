<!-- TODO: Hitbox -->

<script lang="ts">
  import { derived, type Readable, type Writable } from 'svelte/store';
  import type { Region } from '$lib/util/definitions/client/region';
  import { type ScaleBand, scaleBand, type ScaleLinear, scaleLinear } from 'd3-scale';
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
  import Alert from '$lib/components/util/Alert.svelte';
  import { ntoq, qton, type as getType } from '$lib/util/types';
  import { Types } from '$lib/util/definitions/client/types.d';

  export let region: Region;
  export let type: Types | undefined = undefined;

  const column: Writable<any[]> = region.data;
  const rtype: Writable<Types> = region.type;

  let autoConvert: boolean = false;

  const rects: RegionPoint[] = [];

  const offset: Writable<number> = region.offset;
  const w: Readable<number> = derived<[Writable<number>, Writable<any[]>], number>(
    [width, column],
    ([width, column]: [number, any[]]): number => column.length * width / 4
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

  $: {
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
    $column.forEach((d: any, i: number): RegionPoint => rects[i] = { x: x(i), y: y(d)! });
  }

  $: if ($column.length + $offset * 4 > $duration * 4)
    $duration = round($column.length / 4 + $offset, 4) + 4;

  $: {
    if (type && $rtype !== type) {
      if (type === Types.QUANTITATIVE) $column = ntoq($column);
      else $column = qton($column);

      autoConvert = true;
    }

    $rtype = getType($column);
  }
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
    { #each rects as { x, y } }
      { #key y }
        <rect
          class="cursor-pointer fill-blue-900 hover:fill-blue-600"
          height="5"
          transition:fade
          width={ $width / 4 }
          { x }
          y={ y - 2.5 }
        />
      { /key }
    { /each }
  </svg>
</button>

{ #if autoConvert }
  <Alert>
    Placing { $rtype } data <b><kbd>{ region.source.column }</kbd></b> of dataset <b><kbd>{ $data[region.source.id].name }</kbd></b> in a { type } parameter.
    The data has been automatically casted to a { type } type.
  </Alert>
{ /if }
