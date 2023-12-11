<script lang="ts">
  import type { Writable } from 'svelte/store';
  import type { KeyboardEventHandler } from 'svelte/elements';

  export let name: Writable<string>;

  const handleKeyDown: KeyboardEventHandler<HTMLSpanElement> = (e: KeyboardEvent) => {
    if (e.key !== 'Enter') return;
    e.preventDefault();
    (e.target as HTMLSpanElement).blur();
  };
</script>

<span
  bind:textContent={ $name }
  class="bg-transparent cursor-text outline-none"
  contenteditable
  on:click|stopPropagation
  on:keydown|stopPropagation={ handleKeyDown }
  on:keyup|preventDefault
  role="textbox"
  tabindex="0"
/>
