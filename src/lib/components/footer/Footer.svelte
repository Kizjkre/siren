<script lang="ts">
  // noinspection TypeScriptCheckImport
  import IconPlayerPause from '~icons/tabler/player-pause';
  // noinspection TypeScriptCheckImport
  import IconPlayerPlay from '~icons/tabler/player-play';
  // noinspection TypeScriptCheckImport
  import IconPlayerStop from '~icons/tabler/player-stop';
  import type { MouseEventHandler } from 'svelte/elements';
  import rate from '$lib/stores/rate';
  import { pause, play, stop } from '$lib/util/status';
  import status from '$lib/stores/status';
  import { Status } from '$lib/util/definitions/status';

  const handlePause: MouseEventHandler<HTMLButtonElement> = (): any => {
    pause();
    $status = Status.pause;
  };

  const handlePlay: MouseEventHandler<HTMLButtonElement> = (): any => {
    play();
    $status = Status.play;
  };

  const handleStop: MouseEventHandler<HTMLButtonElement> = (): any => {
    stop();
    $status = Status.stop;
  };
</script>

<footer class="flex flex-col gap-2 h-full md:flex-row w-full">
  <div class="basis-1/4 flex"></div>
  <div class="basis-1/2 flex gap-2 items-center justify-center">
    <button
      class="border flex h-6 items-center justify-center md:h-12 rounded-full transition w-12"
      class:bg-gray-100={ $status !== Status.stop }
      class:border-blue-600={ $status !== Status.stop }
      class:text-blue-600={ $status !== Status.stop }
      class:text-gray-100={ $status === Status.stop }
      disabled={ $status === Status.stop }
      on:click={ handleStop }
    >
      <IconPlayerStop />
    </button>
    <button
      class="border flex h-8 items-center justify-center md:h-16 rounded-full transition w-16"
      class:bg-gray-100={ $status !== Status.play }
      class:border-blue-600={ $status !== Status.play }
      class:text-blue-600={ $status !== Status.play }
      class:text-gray-100={ $status === Status.play }
      disabled={ $status === Status.play }
      on:click={ handlePlay }
    >
      <IconPlayerPlay />
    </button>
    <button
      class="border flex h-6 items-center justify-center md:h-12 rounded-full transition w-12"
      class:bg-gray-100={ $status === Status.play }
      class:border-blue-600={ $status === Status.play }
      class:text-blue-600={ $status === Status.play }
      class:text-gray-100={ $status !== Status.play }
      disabled={ $status !== Status.play }
      on:click={ handlePause }
    >
      <IconPlayerPause />
    </button>
  </div>
  <div class="basis-1/4 flex items-center justify-center md:p-0 pb-2">
    <form class="flex gap-2 items-center">
      <label class="md:text-base text-xs" for="rate">Playback Rate</label>
      <input
        bind:value={ $rate }
        class="border md:text-base ml-1 px-2 py-1 rounded text-xs"
        class:cursor-not-allowed={ $status !== Status.stop }
        disabled={ $status !== Status.stop }
        id="rate"
        min="0.1"
        step="any"
        type="number"
      />
    </form>
  </div>
</footer>
