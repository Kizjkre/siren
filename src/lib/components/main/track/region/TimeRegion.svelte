<!-- TODO: Hitbox -->

<script lang="ts">
  import { derived, type Writable } from 'svelte/store';
  import type { Region } from '$lib/util/definitions/region';
  import { type ScaleLinear, scaleLinear } from 'd3-scale';
  import data from '$lib/stores/data';
  import width from '$lib/stores/width';
  import type { MouseEventHandler } from 'svelte/elements';
  import displacement from '$lib/util/drag/displacement';
  import round from '$lib/util/drag/round';
  import { IconCircleX } from '@tabler/icons-svelte';
  import { createEventDispatcher, type EventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';

  export let region: Region;

  const column: number[] = $data[region.source.id].data.map((row: any): number =>
    +(row[region.source.column] || 0)
  );

  const rects: RegionPoint[] = [];

  const offset: Writable<number> = region.offset;
  const w = derived(width, (width: number): number => column.length * width / 4);

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
    const x: ScaleLinear<number, number> = scaleLinear()
      .domain([0, column.length])
      .range([0, column.length * $width / 4]);
    const y: ScaleLinear<number, number> = scaleLinear()
      .domain([Math.min(...column), Math.max(...column)])
      .range([49 - 2.5, 25]);

    column.forEach((d: number, i: number): RegionPoint => rects[i] = { x: x(i), y: y(d) });
  }
</script>

<button
  class="absolute active:cursor-grabbing bg-gray-100 border-x border-blue-600 box-content cursor-grab h-full"
  on:mousedown={ handleMouseDown }
  style:left="{ $offset * $width }px"
  style:width="{ $w }px"
  transition:fade={ { duration: 100 } }
>
  <span class="absolute flex gap-2 items-center left-1 text-xs">
    <button class="hover:text-red-400 text-blue-600" on:click|stopPropagation={ forward }>
      <IconCircleX class="h-3 w-3" />
    </button>
    <span>{ $data[region.source.id].name } / { region.source.column }</span>
  </span>
  <svg class="h-full" width={ $w }>
    { #each rects as { x, y } }
    	<rect class="cursor-pointer hover:fill-blue-600" height="5" width={ $width / 4 } { x } y={ y - 2.5 }></rect>
    { /each }
  </svg>
</button>
