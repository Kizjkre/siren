<script lang="ts">
  import type { MouseEventHandler } from 'svelte/elements';

  export let name: string;
  export let selected = false;

  const handleClick: MouseEventHandler<HTMLButtonElement> = (): boolean => selected = !selected;
</script>

<button
  class="border-x border-x-transparent hover:bg-gray-100 hover:border-l-blue-600 hover:text-blue-600 text-left px-2 py-1 w-full"
  class:bg-gray-100={ selected }
  class:border-l-blue-600={ selected }
  class:text-blue-600={ selected }
  on:click
  on:click={ handleClick }
>
  <span class="flex gap-2 items-center">
    <slot name="icon" />
    { name }
  </span>
  <slot />
</button>
