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
  import timeline from '$lib/util/timeline';
  import { get, writable } from 'svelte/store';
  import synths from '$lib/stores/synths';
  // @ts-ignore
  import action from '$lib/util/sandbox/action/export?raw';
  import download from '$lib/util/download';
  import sandbox from '$lib/stores/sandbox';
  import save from '$lib/util/save';

  let csv: HTMLInputElement;

  const handleImportCSV: MouseEventHandler<any> = (): any => csv.click();

  const handleExport: MouseEventHandler<any> = (): any => {
    const t: Timeline[] = timeline();

    sandbox
      .read('export')
      .then(async ({ payload: result }: { action: string, payload: any }): Promise<any> => {
        download('siren.wav', result);
      });

    sandbox.add('export', {
      action,
      data: writable<{ timeline: Timeline[] }>({ timeline: t }),
      scripts: Object.fromEntries(t.map((timeline: Timeline, i: number): [string, string] => [`userscript-${ i }`, get(synths)[timeline.synth].code]))
    });
  };

  const handleSave: MouseEventHandler<any> = save;
</script>

<NavItem name="File">
  <NavDropdownItem>
    <IconFolderOpen slot="icon" />
    Open
  </NavDropdownItem>
  <NavDropdownItem on:click={ handleSave }>
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
