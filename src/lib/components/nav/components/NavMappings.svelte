<script lang="ts">
  import NavItem from '$lib/components/nav/NavItem.svelte';
  import NavDropdownItem from '$lib/components/nav/NavDropdownItem.svelte';
  import { IconPlus } from '@tabler/icons-svelte';
</script>

<NavItem name="Mappings">
  <NavDropdownItem>
    <IconPlus slot="icon" />
    Add Mapping
  </NavDropdownItem>
</NavItem>
