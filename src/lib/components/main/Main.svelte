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

  const handleDblClick: MouseEventHandler<HTMLElement> = (): any => tracks.add();
</script>

<main class="flex flex-col h-full overflow-scroll relative">
  <div class="relative" style:width="{ $width * $duration + 200 }px">
    <Seeker />
    <Timeline />
    <div>
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
