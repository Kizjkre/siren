<script lang="ts">
  import tracks from '$lib/stores/tracks';
  import type { Track, TrackRegionStoreInterface } from '$lib/util/definitions/tracks';
  import RegionComponent from '$lib/components/main/track/region/Region.svelte';
  import { handleDragLeave, handleDragOver, handleDrop } from '$lib/util/drag/data';
  import TimeRegion from '$lib/components/main/track/region/TimeRegion.svelte';
  import type { EventListenerCreator } from '$lib/util/definitions/listener';
  import { get, type Writable } from 'svelte/store';
  import trackSelect from '$lib/stores/trackSelect';
  import synths from '$lib/stores/synths';

  export let id: number;

  const track: Track = $tracks[id];
  const timbral: TrackRegionStoreInterface = track.regions.timbral;
  const time: TrackRegionStoreInterface = track.regions.time;
  const view: Writable<string> = track.view;
  const synth: Writable<number> = track.synth;

  const onTimbralRemove: EventListenerCreator<[number]> =
    (id: number): EventListener => (): void => {
      const link: number = get(get(timbral)[$view][id].link);
      link > -1 && time.remove($view, link);
      timbral.remove($view, id);
    };
  const onTimeRemove: EventListenerCreator<[number]> =
    (id: number): EventListener => (): void => {
      const link: number = get(get(time)[$view][id].link);
      get(timbral)[$view][link].link.set(-1);
      time.remove($view, id);
    }
</script>

<div class="flex flex-col h-full transition w-full" class:bg-gray-100={ $trackSelect === id }>
  <div
    class="h-timbral relative w-full"
    data-accept="siren/region"
    data-type="timbral"
    on:dragleave|preventDefault={ handleDragLeave }
    on:dragover|preventDefault={ handleDragOver }
    on:drop|preventDefault={ handleDrop(id, $view) }
    role="region"
  >
    { #each Object.entries($timbral[$view]) as [regionId, region] (regionId) }
      <RegionComponent
        id={ regionId }
        on:remove={ onTimbralRemove(+regionId) }
        { region }
        trackId={ id }
        type={ $synths[$synth].parameters.timbral[$view] }
        view={ $view }
      />
    { /each }
  </div>
  <div
    class="border-t h-time relative w-full"
    data-accept="siren/region"
    data-type="time"
    role="region"
  >
    { #each Object.entries($time[$view]) as [regionId, region] (regionId) }
      <TimeRegion
        on:remove={ onTimeRemove(+regionId) }
        trackId={ id }
        { region }
        view={ $view }
      />
    { /each }
  </div>
</div>
