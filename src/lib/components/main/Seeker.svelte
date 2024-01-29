<script lang="ts">
  import status from '$lib/stores/status';
  import width from '$lib/stores/width';
  // @ts-ignore
  import { browser } from '$app/environment';
  import rate from '$lib/stores/rate';
  import { Status } from '$lib/util/definitions/status.d';
  import sandbox from '$lib/stores/sandbox';

  enum StatusTime {
    stop = -1,
    pause = -2
  }

  let animate: FrameRequestCallback;
  let elapsed: number = StatusTime.stop;
  let left = 0;
  let start: number | StatusTime = StatusTime.stop;

  // @ts-ignore
  !animate && browser && (
    animate = (time: DOMHighResTimeStamp): any => {
      if ($status !== Status.play) return;
      if (start === StatusTime.stop) start = time;
      else if (start === StatusTime.pause) start = time - elapsed;
      elapsed = time - start;
      left = $width / (1000 / $rate) * elapsed;
      requestAnimationFrame(animate);
    }
  );

  $: switch ($status) {
    case Status.pause:
      start = StatusTime.pause;
      break;
    case Status.play:
      sandbox
        .read('play', false)
        .then(({ action }: { action: string, payload: any }) => action === 'start' && requestAnimationFrame(animate));
      break;
    case Status.stop:
      left = 0;
      start = StatusTime.stop;
      break;
  }
</script>

<div class="absolute border-l border-l-red-500 h-full left-track-header z-[1]" style:transform="translateX({ left }px)" />
