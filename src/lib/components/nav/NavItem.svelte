<script lang="ts">
  import clickOutside from '$lib/actions/clickOutside';
  import type { MouseEventHandler } from 'svelte/elements';

  export let name: string;

  let div: HTMLDivElement;
  let dropdown: HTMLDialogElement;
  let selected: boolean = false;

  const handleOpen: () => void = () => {
    if (selected) dropdown.close();
    else dropdown.show();
    selected = !selected;
  };

  const handleClickOutside: MouseEventHandler<HTMLButtonElement> = () => {
    dropdown.close();
    selected = false;
  };
</script>

<div
  bind:this={ div }
  class="flex items-center relative select-none"
  class:bg-gray-100={ selected }
  class:!border-b-blue-600={ selected }
  class:text-blue-600={ selected }
  on:click={ handleOpen }
  on:keydown={ handleOpen }
  role="button"
  tabindex="0"
  use:clickOutside={ handleClickOutside }
>
  { name }
  <dialog
    bind:this={ dropdown }
    class="border border-gray-100 border-t-0 m-0 py-1 rounded-b top-dropdown w-max"
    class:hidden={ !$$slots.default }
  >
    <slot />
  </dialog>
</div>
