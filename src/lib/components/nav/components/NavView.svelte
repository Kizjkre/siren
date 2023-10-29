<script lang="ts">
  import NavItem from '$lib/components/nav/NavItem.svelte';
  import NavDropdownItem from '$lib/components/nav/NavDropdownItem.svelte';
  // noinspection TypeScriptCheckImport
  import IconLayoutSidebarLeftCollapseFilled from '~icons/tabler/layout-sidebar-left-collapse-filled';
  // noinspection TypeScriptCheckImport
  import IconLayoutSidebarLeftExpandFilled from '~icons/tabler/layout-sidebar-left-expand-filled';
  import sidebar from '$lib/stores/sidebar';
  import type { MouseEventHandler } from 'svelte/elements';

  const handleClick: MouseEventHandler<any> = sidebar.toggle;
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
