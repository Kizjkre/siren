<script lang="ts">
  // noinspection TypeScriptCheckImport
  import IconCircleX from '~icons/tabler/circle-x';
  // noinspection TypeScriptCheckImport
  import IconFileFunction from '~icons/tabler/file-function';
  // noinspection TypeScriptCheckImport
  import IconMathFunction from '~icons/tabler/math-function';
  import AsideItem from '$lib/components/aside/AsideItem.svelte';
  import mappings from '$lib/stores/mappings';
  import AsideListItem from '$lib/components/aside/AsideListItem.svelte';
  import Mappings from '$lib/components/aside/components/dropdowns/Mappings.svelte';
  import MappingsTitle from '$lib/components/aside/components/titles/Mappings.svelte';
  import { handleDragStart } from '$lib/util/drag/mapping';
  // @ts-ignore
  import { browser } from '$app/environment';
  import type { EventListenerCreator } from '$lib/util/definitions/listener';

  const selected: boolean[] = [];

  const props: ComponentAttrsCreator = (id: number): ComponentAttrs => ({
    'class:active:cursor-grabbing': true,
    'class:cursor-grab': true,
    draggable: true,
    'on:dragstart': handleDragStart(id)
  });

  const handleClick: EventListener = (): void => mappings.add();

  const handleClose: EventListenerCreator<[number]> =
    (id: number): EventListener => (): void =>
      mappings.remove(id);

  // NOTE: Temporary Fix
  $: {
    selected;
    browser && document.querySelectorAll('.ace_editor.ace_hidpi.ace_autocomplete.ace-cloud9-day').forEach(el => el.remove());
  }
</script>

<AsideItem name="Mappings" on:click={ handleClick }>
  <IconFileFunction slot="icon" />
  <IconCircleX class="rotate-45" slot="action" />
  { #each Object.entries($mappings) as [id, { name }], i (id) }
  	<AsideListItem bind:selected={ selected[i] } on:close={ handleClose(+id) } props={ props(+id) }>
      <IconMathFunction slot="icon" />
      <MappingsTitle { name } slot="name" />
      { #if selected[i] }
        <Mappings { id } />
      { /if }
    </AsideListItem>
  { /each }
</AsideItem>
