<script lang="ts">
  import { IconCircleX, IconFileDatabase, IconTable } from '@tabler/icons-svelte';
  import AsideItem from '$lib/components/aside/AsideItem.svelte';
  import AsideListItem from '$lib/components/aside/AsideListItem.svelte';
  import data from '$lib/stores/data';
  import Data from '$lib/components/aside/components/dropdowns/Data.svelte';
  import handleImportCSVChange from '$lib/util/import/csv';
  import type { EventListenerCreator } from '$lib/util/definitions/listener';

  const selected: boolean[] = [];

  let csv: HTMLInputElement;

  const handleAction: EventListener = (): void => csv.click();

  const handleClose: EventListenerCreator<number> =
    (id: number): EventListener => (): void => data.remove(id);
</script>

<AsideItem name="Data" on:click={ handleAction }>
  <IconFileDatabase slot="icon" />
  <IconCircleX class="rotate-45" slot="action" />
  { #each Object.entries($data) as [id, { name }], i (id) }
    <AsideListItem bind:selected={ selected[i] } on:close={ handleClose(+id) }>
      <IconTable slot="icon" />
      <svelte:fragment slot="name">{ name }</svelte:fragment>
      { #if selected[i] }
        <Data id={ +id } />
      { /if }
    </AsideListItem>
  { /each }
  <input accept="text/csv" bind:this={ csv } class="hidden" on:change={ handleImportCSVChange } type="file" />
</AsideItem>
