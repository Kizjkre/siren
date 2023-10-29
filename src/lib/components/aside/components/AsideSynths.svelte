<script lang="ts">
  // noinspection TypeScriptCheckImport
  import IconCircleX from '~icons/tabler/circle-x';
  // noinspection TypeScriptCheckImport
  import IconFileMusic from '~icons/tabler/file-music';
  // noinspection TypeScriptCheckImport
  import IconWaveSine from '~icons/tabler/wave-sine';
  import AsideItem from '$lib/components/aside/AsideItem.svelte';
  import synths from '$lib/stores/synths';
  import AsideListItem from '$lib/components/aside/AsideListItem.svelte';
  import handleImportSynthChange from '$lib/util/import/synth';
  import { handleDragStart } from '$lib/util/drag/synth';

  let js: HTMLInputElement;

  const props: ComponentAttrsCreator = (id: number): ComponentAttrs => ({
    'class:active:cursor-grabbing': true,
    'class:cursor-grab': true,
    draggable: true,
    'on:dragstart': handleDragStart(id)
  });

  const handleAction: EventListener = (): void => js.click();

  const handleClose: (id: number) => EventListener =
    (id: number): EventListener => () => synths.remove(id);
</script>

<AsideItem name="Synths" on:click={ handleAction }>
  <IconFileMusic slot="icon" />
  <IconCircleX class="rotate-45" slot="action" />
  { #each Object.entries($synths) as [id, { name }] (id) }
  	<AsideListItem on:close={ handleClose(+id) } props={ props(+id) }>
      <IconWaveSine slot="icon" />
      <svelte:fragment slot="name">{ name }</svelte:fragment>
    </AsideListItem>
  { /each }
  <input accept="application/javascript" bind:this={ js } class="hidden" on:change={ handleImportSynthChange } type="file" />
</AsideItem>
