<script lang="ts">
  import NavItem from '$lib/components/nav/NavItem.svelte';
  import NavDropdownItem from '$lib/components/nav/NavDropdownItem.svelte';
  // noinspection TypeScriptCheckImport
  import IconPlus from '~icons/tabler/plus';
  import type { MouseEventHandler } from 'svelte/elements';
  import mappings from '$lib/stores/mappings';

  const handleClick: MouseEventHandler<any> = (): any => mappings.add();
</script>

<NavItem name="Mappings">
  <NavDropdownItem on:click={ handleClick }>
    <IconPlus slot="icon" />
    Add Mapping
  </NavDropdownItem>
</NavItem>
