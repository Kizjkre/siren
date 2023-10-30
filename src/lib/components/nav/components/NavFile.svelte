<script lang="ts">
  import NavItem from '$lib/components/nav/NavItem.svelte';
  import NavDropdownItem from '$lib/components/nav/NavDropdownItem.svelte';
  // noinspection TypeScriptCheckImport
  import IconDeviceFloppy from '~icons/tabler/device-floppy';
  // noinspection TypeScriptCheckImport
  import IconFileExport from '~icons/tabler/file-export';
  // noinspection TypeScriptCheckImport
  import IconFileImport from '~icons/tabler/file-import';
  // noinspection TypeScriptCheckImport
  import IconFolderOpen from '~icons/tabler/folder-open';
  import type { MouseEventHandler } from 'svelte/elements';
  import handleImportCSVChange from '$lib/util/import/csv';
  import { onSandboxReturn, useSandbox } from '$lib/util/sandbox/useSandbox';
  import timeline from '$lib/util/timeline';
  import { get } from 'svelte/store';
  import synths from '$lib/stores/synths';
  // @ts-ignore
  import action from '$lib/util/sandbox/action/export?raw';
  import download from '$lib/util/export/download';
  import merge from '$lib/util/export/merge';
  import tracks from '$lib/stores/tracks';

  let csv: HTMLInputElement;

  const handleImportCSV: MouseEventHandler<any> = (): any => csv.click();

  const handleExport: MouseEventHandler<any> = (): any => {
    let i: number = 0;
    const t: Blob[] = [];
    timeline((timeline: Timeline): any => {
      onSandboxReturn(`export-${ i }`, async (e: CustomEventInit): Promise<any> => {
        t.push(e.detail);

        if (t.length === Object.keys($tracks).length) {
          const blob: Blob = await merge(t);
          blob && download('siren.wav', blob);
        }
      });

      useSandbox(`export-${ i }`, {
        action,
        script: get(synths)[timeline.synth].code,
        data: { timeline }
      });

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
