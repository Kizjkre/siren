<script lang="ts">
  import { fade } from 'svelte/transition';
  import portal from '$lib/actions/portal';
  // noinspection TypeScriptCheckImport
  import IconAlertTriangleFilled from '~icons/tabler/alert-triangle-filled';
  // noinspection TypeScriptCheckImport
  import { get_current_component } from 'svelte/internal';
  import { onMount } from 'svelte';

  const container: HTMLElement = document.querySelector('#alert-container')!;

  const self: any = get_current_component();
  onMount((): any => setTimeout((): any => self.$destroy(), 5000));
</script>

<section
  class="absolute border border-red-400 bg-red-100 flex flex-col gap-2 justify-center mx-4 my-2 px-4 py-2 rounded text-red-700 text-sm w-full"
  transition:fade
  use:portal={ container }
>
  <h6 class="flex font-bold gap-2 items-center">
    <IconAlertTriangleFilled />
    Alert!
  </h6>
  <p class="text-xs">
    <slot />
  </p>
</section>
