<script lang="ts">
  import NavItem from '$lib/components/nav/NavItem.svelte';
  import NavDropdownItem from '$lib/components/nav/NavDropdownItem.svelte';
  import { IconDeviceFloppy, IconFileExport, IconFileImport, IconFolderOpen } from '@tabler/icons-svelte';
  import type { MouseEventHandler } from 'svelte/elements';
  import handleImportCSVChange from '$lib/util/import/csv';

  let csv: HTMLInputElement;

  const handleImportCSV: MouseEventHandler<any> = (): any => csv.click();
</script>

<NavItem name="File">
  <NavDropdownItem>
    <IconFolderOpen slot="icon" />
    Open
  </NavDropdownItem>
  <NavDropdownItem>
    <IconDeviceFloppy slot="icon" />
    Save
  </NavDropdownItem>
  <NavDropdownItem>
    <IconFileExport slot="icon" />
    Export to <code>.wav</code>
  </NavDropdownItem>
  <hr />
  <NavDropdownItem on:click={ handleImportCSV }>
    <IconFileImport slot="icon" />
    Import <code>.csv</code>
    <input accept="text/csv" bind:this={ csv } class="hidden" on:change={ handleImportCSVChange } type="file" />
  </NavDropdownItem>
</NavItem>
