<script lang="ts">
  import type { MouseEventHandler } from 'svelte/elements';
  import { fade } from 'svelte/transition';
  import { IconCircleX } from '@tabler/icons-svelte';
  import { createEventDispatcher, type EventDispatcher } from 'svelte';

  export let selected: boolean = false;

  const dispatch: EventDispatcher<{ [key: string]: void }> = createEventDispatcher();

  const forward: MouseEventHandler<HTMLButtonElement> = (): boolean => dispatch('close');

  const handleClick: MouseEventHandler<HTMLButtonElement> = (): boolean => selected = !selected;
</script>

<button
  class="border-x border-x-transparent hover:bg-gray-100 hover:border-l-blue-600 hover:text-blue-600 text-left px-2 py-1 transition w-full"
  class:bg-gray-100={ selected }
  class:border-l-blue-600={ selected }
  class:text-blue-600={ selected }
  on:click
  on:click={ handleClick }
  transition:fade
>
  <span class="flex items-center justify-between">
    <span class="flex gap-2 items-center">
      <slot name="icon" />
      <slot name="name" />
    </span>
    <button class="hover:text-red-400" on:click|stopPropagation={ forward }>
      <IconCircleX class="h-6 w-6" />
    </button>
  </span>
  <slot />
</button>
