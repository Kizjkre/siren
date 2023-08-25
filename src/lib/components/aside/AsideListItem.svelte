<script lang="ts">
  import type { MouseEventHandler } from 'svelte/elements';
  import { fade } from 'svelte/transition';
  import { IconCircleX } from '@tabler/icons-svelte';
  import { createEventDispatcher, type EventDispatcher } from 'svelte';
  import attrs from '$lib/actions/attrs';
  import type { ComponentAttrs } from '$lib/util/definitions/componentAttr';

  export let props: ComponentAttrs = {};
  export let selected: boolean = false;

  const dispatch: EventDispatcher<None> = createEventDispatcher();

  const forward: MouseEventHandler<HTMLButtonElement> = (): any => dispatch('close');

  const handleClick: MouseEventHandler<HTMLButtonElement> = (): any => selected = !selected;
</script>

<button
  class="border-x border-x-transparent hover:bg-gray-100 hover:border-l-blue-600 hover:text-blue-600 text-left px-2 py-1 transition w-full"
  class:bg-gray-100={ selected }
  class:border-l-blue-600={ selected }
  class:text-blue-600={ selected }
  on:click
  on:click={ handleClick }
  transition:fade
  use:attrs={ props }
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
