<script lang="ts">
  import NavItem from '$lib/components/nav/NavItem.svelte';
  import NavDropdownItem from '$lib/components/nav/NavDropdownItem.svelte';
  import { IconDeviceFloppy, IconFileExport, IconFileImport, IconFolderOpen } from '@tabler/icons-svelte';
  import type { MouseEventHandler } from 'svelte/elements';
  import handleImportCSVChange from '$lib/util/import/csv';
  import { createSandbox, onSandboxReturn } from '$lib/util/sandbox/useSandbox';
  import timeline from '$lib/util/timeline';
  import { get } from 'svelte/store';
  import synths from '$lib/stores/synths';
  // @ts-ignore
  import process from '$lib/util/sandbox/process/processExport?raw';
  import download from '$lib/util/download';
  import { convert, merge } from '$lib/util/ffmpeg';
  import tracks from '$lib/stores/tracks';

  let csv: HTMLInputElement;

  const handleImportCSV: MouseEventHandler<any> = (): any => csv.click();

  const handleExport: MouseEventHandler<any> = (): any => {
    let i: number = 0;
    const t: Blob[] = [];
    timeline((timeline: Timeline): any => {
      onSandboxReturn(`export-${ i }`, async (e: CustomEventInit): Promise<any> => {
        t.push(e.detail);

        if (t.length === Object.keys($tracks).length) download('siren.wav', await merge(t));
      });

      createSandbox(`export-${ i }`, get(synths)[timeline.synth].code, process, { timeline });

      i++;
    });
  };
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
  <NavDropdownItem on:click={ handleExport }>
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
