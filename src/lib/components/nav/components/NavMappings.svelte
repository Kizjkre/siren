<script lang="ts">
  import NavItem from '$lib/components/nav/NavItem.svelte';
  import NavDropdownItem from '$lib/components/nav/NavDropdownItem.svelte';
  // noinspection TypeScriptCheckImport
  import IconPlus from '~icons/tabler/plus';
</script>

<NavItem name="Mappings">
  <NavDropdownItem>
    <IconPlus slot="icon" />
    Add Mapping
  </NavDropdownItem>
</NavItem>
