<script lang="ts">
  import { IconFileDatabase, IconTable, IconTableRow } from '@tabler/icons-svelte';
  import AsideItem from '$lib/components/aside/AsideItem.svelte';
  import AsideListItem from '$lib/components/aside/AsideListItem.svelte';
  import data from '$lib/stores/data';

  let selected: boolean;
</script>

<AsideItem name="Data">
  <IconFileDatabase slot="icon" />
  { #each Object.entries($data) as [name, data] }
    <AsideListItem bind:selected { name }>
      <IconTable slot="icon" />
      <div class="flex flex-col gap-1 ml-4 mt-2" class:hidden={ !selected }>
        { #each data.columns as column }
          <div class="flex justify-between">
            <button class="after:border-b-blue-600 flex gap-2 items-center link">
              <IconTableRow class="h-4 w-4" />
              { column }
            </button>
            <p class="border border-blue-600 flex h-6 items-center justify-center rounded text-xs w-6">
              { #if typeof data[0][column] === 'string' }
              	N
              { :else if typeof data[0][column] === 'number' }
                Q
              { /if }
            </p>
          </div>
        { /each }
      </div>
    </AsideListItem>
  { /each }
</AsideItem>
