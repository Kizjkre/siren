<script lang="ts">
  import { IconPlayerPause, IconPlayerPlay, IconPlayerStop } from '@tabler/icons-svelte';
  import type { MouseEventHandler } from 'svelte/elements';
  import rate from '$lib/stores/rate';
  import { pause, play, stop } from '$lib/util/status';
  import status from '$lib/stores/status';
  import { Status } from '$lib/util/definitions/status';

  const handlePause: MouseEventHandler<HTMLButtonElement> = (): any => {
    $status = Status.pause;
    pause();
  };

  const handlePlay: MouseEventHandler<HTMLButtonElement> = (): any => {
    $status = Status.play;
    play();
  };

  const handleStop: MouseEventHandler<HTMLButtonElement> = (): any => {
    $status = Status.stop;
    stop();
  };
</script>

<footer class="flex h-full w-full">
  <div class="basis-1/4 flex"></div>
  <div class="basis-1/2 flex gap-2 items-center justify-center">
    <button
      class=" border flex h-12 items-center justify-center rounded-full transition w-12"
      class:bg-gray-100={ $status !== Status.stop }
      class:border-blue-600={ $status !== Status.stop }
      class:text-blue-600={ $status !== Status.stop }
      class:text-gray-100={ $status === Status.stop }
      on:click={ handleStop }
    >
      <IconPlayerStop />
    </button>
    <button
      class="bg-gray-100 border flex h-16 items-center justify-center rounded-full transition w-16"
      class:bg-gray-100={ $status !== Status.play }
      class:border-blue-600={ $status !== Status.play }
      class:text-blue-600={ $status !== Status.play }
      class:text-gray-100={ $status === Status.play }
      on:click={ handlePlay }
    >
      <IconPlayerPlay />
    </button>
    <button
      class="border flex h-12 items-center justify-center rounded-full transition w-12"
      class:bg-gray-100={ $status === Status.play }
      class:border-blue-600={ $status === Status.play }
      class:text-blue-600={ $status === Status.play }
      class:text-gray-100={ $status !== Status.play }
      on:click={ handlePause }
    >
      <IconPlayerPause />
    </button>
  </div>
  <div class="basis-1/4 flex items-center">
    <form>
      <label for="rate">Playback Rate</label>
      <input
        bind:value={ $rate }
        class="border ml-1 px-2 py-1 rounded"
        class:cursor-not-allowed={ $status !== Status.stop }
        disabled={ $status !== Status.stop }
        id="rate"
        min="0.25"
        max="16"
        step="any"
        type="number"
      />
    </form>
  </div>
</footer>
