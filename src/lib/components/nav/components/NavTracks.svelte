<script lang="ts">
  import NavItem from '$lib/components/nav/NavItem.svelte';
  import NavDropdownItem from '$lib/components/nav/NavDropdownItem.svelte';
  import { IconPlus } from '@tabler/icons-svelte';
  import type { MouseEventHandler } from 'svelte/elements';
  import tracks from '$lib/stores/tracks';

  const handleClick: MouseEventHandler<any> = (): any => tracks.add();
</script>

<NavItem name="Tracks">
  <NavDropdownItem on:click={ handleClick }>
    <IconPlus slot="icon" />
    Add Track
  </NavDropdownItem>
</NavItem>
