<script lang="ts">
  import NavItem from '$lib/components/nav/NavItem.svelte';
  import NavDropdownItem from '$lib/components/nav/NavDropdownItem.svelte';
  import { IconPlus } from '@tabler/icons-svelte';
  import type { MouseEventHandler } from 'svelte/elements';
  import handleImportSynthChange from '$lib/util/import/synth';

  let js: HTMLInputElement;

  const handleClick: MouseEventHandler<HTMLButtonElement> = (): void => js.click();
</script>

<NavItem name="Synths">
  <NavDropdownItem on:click={ handleClick }>
    <IconPlus slot="icon" />
    Add Synth
    <input accept="application/javascript" bind:this={ js } class="hidden" on:change={ handleImportSynthChange } type="file" />
  </NavDropdownItem>
</NavItem>
