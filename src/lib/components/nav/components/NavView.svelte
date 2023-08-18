<script lang="ts">
  import NavItem from '$lib/components/nav/NavItem.svelte';
  import NavDropdownItem from '$lib/components/nav/NavDropdownItem.svelte';
  import { IconLayoutSidebarLeftCollapseFilled, IconLayoutSidebarLeftExpandFilled } from '@tabler/icons-svelte';
  import sidebar from '$lib/stores/sidebar';
  import type { MouseEventHandler } from 'svelte/elements';

  const handleClick: MouseEventHandler<HTMLButtonElement> = (): void => sidebar.update(v => !v);
</script>

<NavItem name="View">
  <NavDropdownItem on:click={ handleClick }>
    { #if $sidebar }
      <IconLayoutSidebarLeftCollapseFilled slot="icon" />
    { :else }
      <IconLayoutSidebarLeftExpandFilled slot="icon" />
    { /if }
    { $sidebar ? 'Close' : 'Open' } Sidebar
  </NavDropdownItem>
</NavItem>
