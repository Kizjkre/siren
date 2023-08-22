<script lang="ts">
  import { slide } from 'svelte/transition';
  import init from '$lib/util/ace.js';
  import { Ace } from 'ace-builds';
  import mappings from '$lib/stores/mappings';
  import { onMount } from 'svelte';
  import type { Writable } from 'svelte/store';

  export let id: number;

  const map: Writable<string> = $mappings[id].map;

  let ace: Ace.Editor;
  let editor: HTMLDivElement;

  onMount((): void => {
    ace = init(editor);
    ace.setValue($map, 1);
    ace.getSession().on('change', (): void => $map = ace.getValue());
  });
</script>

<div class="ml-4 mt-2" transition:slide>
  <div
    bind:this={ editor }
    on:click|stopPropagation
    on:keyup|preventDefault
    role="none"
  />
</div>
