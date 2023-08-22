<script lang="ts">
  import tracks from '$lib/stores/tracks';
  import type { Track, TrackRegionStore } from '$lib/util/definitions/tracks';
  import RegionComponent from '$lib/components/main/track/region/Region.svelte';
  import { handleDragLeave, handleDragOver, handleDrop } from '$lib/util/drag/data';
  import TimeRegion from '$lib/components/main/track/region/TimeRegion.svelte';

  export let id: number;
  export let parameter: string = 'timbral'; // TODO: Temporary fix

  const track: Track = $tracks[id];

  const timbral: TrackRegionStore = track.regions.timbral;

  const time: TrackRegionStore = track.regions.time;
</script>

<div class="flex flex-col h-full w-full">
  <div
    class="h-timbral relative w-full"
    on:dragleave|preventDefault={ handleDragLeave }
    on:dragover|preventDefault={ handleDragOver }
    on:drop|preventDefault={ handleDrop(id, parameter) }
    role="region"
  >
    { #each Object.entries($timbral[parameter]) as [id, region] (id) }
      <RegionComponent { region } />
    { /each }
  </div>
  <div
    class="border-t h-time relative w-full"
    on:dragleave|preventDefault={ handleDragLeave }
    on:dragover|preventDefault={ handleDragOver }
    on:drop|preventDefault={ handleDrop(id, parameter, true) }
    role="region"
  >
    { #each Object.entries($time[parameter]) as [id, region] (id) }
      <TimeRegion { region } />
    { /each }
  </div>
</div>
