<script lang="ts">
  import { IconCircleX, IconFileFunction, IconMathFunction } from '@tabler/icons-svelte';
  import AsideItem from '$lib/components/aside/AsideItem.svelte';
  import mappings from '$lib/stores/mappings';
  import AsideListItem from '$lib/components/aside/AsideListItem.svelte';
  import type { MouseEventHandler } from 'svelte/elements';
  import Mappings from '$lib/components/aside/components/dropdowns/Mappings.svelte';
  import MappingsTitle from '$lib/components/aside/components/titles/Mappings.svelte';

  const selected: boolean[] = [];

  const handleClick: MouseEventHandler<HTMLButtonElement> = (): void => mappings.add();

  const handleClose: (id: number) => MouseEventHandler<HTMLButtonElement> =
    (id: number): void => (): void => mappings.remove(id);
</script>

<AsideItem name="Mappings" on:click={ handleClick }>
  <IconFileFunction slot="icon" />
  <IconCircleX class="rotate-45" slot="action" />
  { #each Object.entries($mappings) as [id, { name }], i (id) }
  	<AsideListItem bind:selected={ selected[i] } on:close={ handleClose(id) }>
      <IconMathFunction slot="icon" />
      <MappingsTitle { name } slot="name" />
      { #if selected[i] }
        <Mappings { id } />
      { /if }
    </AsideListItem>
  { /each }
</AsideItem>
