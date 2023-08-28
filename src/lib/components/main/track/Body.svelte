<script lang="ts">
  import tracks from '$lib/stores/tracks';
  import type { Track, TrackRegionStore } from '$lib/util/definitions/tracks';
  import RegionComponent from '$lib/components/main/track/region/Region.svelte';
  import { handleDragLeave, handleDragOver, handleDrop } from '$lib/util/drag/data';
  import TimeRegion from '$lib/components/main/track/region/TimeRegion.svelte';
  import type { EventListenerCreator } from '$lib/util/definitions/listener';
  import type { Writable } from 'svelte/store';

  export let id: number;

  const track: Track = $tracks[id];
  const timbral: TrackRegionStore = track.regions.timbral;
  const time: TrackRegionStore = track.regions.time;
  const view: Writable<string> = track.view;

  const onTimbralRemove: EventListenerCreator<[number]> =
    (id: number): EventListener => (): void => timbral.remove($view, id);
  const onTimeRemove: EventListenerCreator<[number]> =
    (id: number): EventListener => (): void => time.remove($view, id);
</script>

<div class="flex flex-col h-full w-full">
  <div
    class="h-timbral relative w-full"
    on:dragleave|preventDefault={ handleDragLeave }
    on:dragover|preventDefault={ handleDragOver }
    on:drop|preventDefault={ handleDrop(id, $view, false) }
    role="region"
  >
    { #each Object.entries($timbral[$view]) as [id, region] (id) }
      <RegionComponent on:remove={ onTimbralRemove(+id) } { region } />
    { /each }
  </div>
  <div
    class="border-t h-time relative w-full"
    on:dragleave|preventDefault={ handleDragLeave }
    on:dragover|preventDefault={ handleDragOver }
    on:drop|preventDefault={ handleDrop(id, $view, true) }
    role="region"
  >
    { #each Object.entries($time[$view]) as [id, region] (id) }
      <TimeRegion on:remove={ onTimeRemove(+id) } { region } />
    { /each }
  </div>
</div>
