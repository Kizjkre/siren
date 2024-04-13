<script lang="ts">
  import tracks from '$lib/stores/tracks';
  import TrackComponent from '$lib/components/main/track/Track.svelte';
  import duration from '$lib/stores/duration';
  import type { MouseEventHandler } from 'svelte/elements';
  // noinspection TypeScriptCheckImport
  import IconCircleX from '~icons/tabler/circle-x';
  import Timeline from '$lib/components/main/Timeline.svelte';
  import width from '$lib/stores/width';
  import Seeker from '$lib/components/main/Seeker.svelte';
  import type { Track, TrackRegionStore } from '$lib/util/definitions/tracks';
  import { get } from 'svelte/store';
  import type { Region } from '$lib/util/definitions/region';

  const handleDblClick: MouseEventHandler<HTMLElement> = (): any => tracks.add();

  const handleMouseUp: MouseEventHandler<HTMLElement> = (): any =>
    Object.values($tracks).forEach((track: Track) => {
      const regions = [
        ...Object.values(get<Region[]>(track.regions.timbral)).flatMap((t: TrackRegionStore): Region => Object.values(t)),
        ...Object.values(get<Region[]>(track.regions.time)).flatMap((t: TrackRegionStore): Region => Object.values(t))
      ];
      $duration = regions.reduce((a: number, b: Region) => Math.max(a, Math.ceil(get(b.data).length / 4 + get(b.offset))), 128);
    });
</script>

<main class="flex flex-col h-full overflow-scroll relative">
  <div class="relative" style:width="{ $width * $duration + 200 }px">
    <Seeker />
    <Timeline />
    <div on:mouseup={ handleMouseUp } role="button" tabindex="-1">
      { #each Object.keys($tracks) as id (id) }
        <TrackComponent id={ +id } />
      { /each }
    </div>
  </div>
  <button
    class="cursor-pointer grid grow items-center justify-center min-h-24 transition"
    on:dblclick={ handleDblClick }
  >
    <IconCircleX class="grow h-12 rotate-45 w-12" /> <!-- NOTE: Circle plus icon -->
  </button>
</main>
