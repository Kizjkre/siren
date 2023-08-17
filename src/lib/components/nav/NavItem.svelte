<script lang="ts">
  import { nodes } from '$lib/util/onWorkstationMount';

  export let name: string;

  let div: HTMLDivElement;
  let dropdown: HTMLDialogElement;
  let selected: boolean = false;

  const handleOpen: () => void = () => {
    if (selected) dropdown.close();
    else {
      dropdown.show();
      nodes.set(div, handleClickOutside);
    }
    selected = !selected;
  };

  const handleClickOutside: () => void = () => {
    dropdown.close();
    selected = false;
    nodes.delete(div);
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
