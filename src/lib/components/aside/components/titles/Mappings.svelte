<script lang="ts">
  import type { Writable } from 'svelte/store';

  export let name: Writable<string>;
</script>

<span
  bind:textContent={ $name }
  class="bg-transparent cursor-text outline-none"
  contenteditable
  on:click|stopPropagation
  on:keyup|preventDefault
  type="text"
/>
