<script lang="ts">
  import { IconCircleX, IconFileMusic, IconWaveSine } from '@tabler/icons-svelte';
  import AsideItem from '$lib/components/aside/AsideItem.svelte';
  import synths from '$lib/stores/synths';
  import AsideListItem from '$lib/components/aside/AsideListItem.svelte';
  import type { MouseEventHandler } from 'svelte/elements';
  import handleImportSynthChange from '$lib/util/import/synth';

  let js: HTMLInputElement;

  const handleAction: MouseEventHandler<HTMLButtonElement> = (): void => js.click();

  const handleClose: (synth: string) => MouseEventHandler<HTMLButtonElement> =
    (synth: string): void => () => synths.remove(synth);
</script>

<AsideItem name="Synths" on:click={ handleAction }>
  <IconFileMusic slot="icon" />
  <IconCircleX class="rotate-45" slot="action" />
  { #each Object.keys($synths) as synth (synth) }
  	<AsideListItem on:close={ handleClose(synth) }>
      <IconWaveSine slot="icon" />
      <svelte:fragment slot="name">{ synth }</svelte:fragment>
    </AsideListItem>
  { /each }
  <input accept="application/javascript" bind:this={ js } class="hidden" on:change={ handleImportSynthChange } type="file" />
</AsideItem>
