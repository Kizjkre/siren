<script lang="ts">
  // @ts-ignore
  import logo from '$lib/assets/images/logo.svg';
  import NavFile from '$lib/components/nav/components/NavFile.svelte';
  import NavEdit from '$lib/components/nav/components/NavEdit.svelte';
  import NavView from '$lib/components/nav/components/NavView.svelte';
  import NavTracks from '$lib/components/nav/components/NavTracks.svelte';
  import NavSynths from '$lib/components/nav/components/NavSynths.svelte';
  import NavMappings from '$lib/components/nav/components/NavMappings.svelte';
  // noinspection TypeScriptCheckImport
  import IconHome from '~icons/tabler/home';
  // noinspection TypeScriptCheckImport
  import IconMenu2 from '~icons/tabler/menu-2';
  import type { MouseEventHandler } from 'svelte/elements';

  let hidden: boolean = true;

  const handleClick: MouseEventHandler<HTMLButtonElement> = () => hidden = !hidden;
</script>

<div class="flex items-center md:hidden pt-2 px-4" class:h-full={ hidden }>
  <button class="border border-black p-2 rounded" on:click={ handleClick }>
    <IconMenu2 />
  </button>
  <div class="flex grow items-center justify-center">
    <img alt="Logo" class="h-6 mr-2" src={ logo }>
  </div>
</div>

<nav class="flex flex-col h-max items-center justify-around md:flex md:flex-row md:h-full w-full" class:hidden>
  <div class="flex flex-col grow h-full hover:nav:bg-gray-100 hover:nav:border-b-blue-600 hover:nav:text-blue-600 items-center md:flex-row ml-2 nav:border-b nav:border-b-transparent nav:h-full nav:px-4 nav:py-2 nav:transition">
    <img alt="Logo" class="h-6 hidden md:block mr-2" src={ logo }>
    <NavFile />
    <NavEdit />
    <NavView />
    <NavTracks />
    <NavSynths />
    <NavMappings />
  </div>
<!--  <a class="after:border-b-red-400 flex gap-2 items-center link mr-12 text-red-400" href="/">-->
<!--    <IconHome class="h-5 w-5" />-->
<!--    Back to Homepage-->
<!--  </a>-->
</nav>
