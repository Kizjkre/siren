<script lang="ts">
  import NavItem from '$lib/components/nav/NavItem.svelte';
  import NavDropdownItem from '$lib/components/nav/NavDropdownItem.svelte';
  // noinspection TypeScriptCheckImport
  import IconLayoutSidebarLeftCollapseFilled from '~icons/tabler/layout-sidebar-left-collapse-filled';
  import IconNetwork from '~icons/tabler/network';
  // noinspection TypeScriptCheckImport
  import IconLayoutSidebarLeftExpandFilled from '~icons/tabler/layout-sidebar-left-expand-filled';
  import sidebar from '$lib/stores/sidebar';
  import type { MouseEventHandler } from 'svelte/elements';

  const handleClick: MouseEventHandler<any> = sidebar.toggle;

  const handleCopy: MouseEventHandler<any> = (): any => navigator.clipboard.writeText(localStorage.getItem('access'));
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
  <NavDropdownItem on:click={ handleCopy }>
    <IconNetwork slot="icon" />
    Copy OSC Address
  </NavDropdownItem>
</NavItem>
