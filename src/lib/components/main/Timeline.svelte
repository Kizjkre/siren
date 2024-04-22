<script lang="ts">
  import duration from '$lib/stores/duration';
  import width from '$lib/stores/width';
  // noinspection TypeScriptCheckImport
  import IconZoomIn from '~icons/tabler/zoom-in';
  // noinspection TypeScriptCheckImport
  import IconZoomOut from '~icons/tabler/zoom-out';
  import type { MouseEventHandler } from 'svelte/elements';
  import { onMount, tick } from 'svelte';

  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  let cWidth: number = 1;
  let dpr: number = 1;
  let wrap: HTMLDivElement;

  onMount(async () => {
    cWidth = wrap.getBoundingClientRect().width;

    await tick();

    ctx = canvas.getContext('2d')!;
    dpr = window.devicePixelRatio;
    ctx.scale(dpr, dpr);

    const rect = canvas.getBoundingClientRect();
    canvas.style.width = `100%`;
    canvas.style.height = `${ rect.height }px`;
  });

  const handleZoomIn: MouseEventHandler<HTMLButtonElement> = (): any => $width = Math.min(300, $width + 10);
  const handleZoomOut: MouseEventHandler<HTMLButtonElement> = (): any => $width = Math.max(20, $width - 10);

  let tickLength = 20;

  $: if (ctx) {
    (async () => {
      cWidth = wrap.getBoundingClientRect().width;

      await tick();

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0, j = 0; i <= cWidth * dpr; i += $width / 4, j++) {
        ctx.beginPath();
        ctx.moveTo(i, canvas.height - tickLength * (!(j % 4) * 2 + !!(j % 4)));
        ctx.lineTo(i, canvas.height + tickLength * (!(j % 4) * 2 + !!(j % 4)));
        ctx.stroke();

        !(j % 4) && ctx.fillText(j / 4, i + $width / 12, canvas.height / 2);
      }
    })();
  }
</script>

<div class="border-b box-border flex">
  <div class="bg-white flex gap-2 items-center justify-center left-0 px-2 w-track-header z-[1]">
    <button class="cursor-zoom-out h-5 w-5" on:click={ handleZoomOut }>
      <IconZoomOut class="h-5 w-5" />
    </button>
    <input bind:value={ $width } max="300" min="20" type="range" />
    <button class="cursor-zoom-in h-5 w-5" on:click={ handleZoomIn }>
      <IconZoomIn class="h-5 w-5" />
    </button>
  </div>
  <div bind:this={ wrap } class="grow">
    <canvas bind:this={ canvas } height={ 25 * dpr } width={ cWidth * dpr }></canvas>
  </div>
</div>
