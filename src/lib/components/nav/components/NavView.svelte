<script lang="ts">
  import NavItem from '$lib/components/nav/NavItem.svelte';
  import NavDropdownItem from '$lib/components/nav/NavDropdownItem.svelte';
  import { IconLayoutSidebarLeftCollapseFilled, IconLayoutSidebarLeftExpandFilled } from '@tabler/icons-svelte';
  import sidebar from '$lib/stores/sidebar';

  const handleClick: Event = (): void => sidebar.update(v => !v);
</script>

<NavItem name="View">
  <NavDropdownItem onClick={ handleClick }>
    { #if $sidebar }
      <IconLayoutSidebarLeftCollapseFilled name="icon" />
    { :else }
      <IconLayoutSidebarLeftExpandFilled name="icon" />
    { /if }
    { $sidebar ? 'Close' : 'Open' } Sidebar
  </NavDropdownItem>
</NavItem>
