<script lang="ts">
  import logo from '$lib/assets/logo.svg';
  import NavFile from '$lib/components/nav/components/NavFile.svelte';
  import NavEdit from '$lib/components/nav/components/NavEdit.svelte';
  import NavView from '$lib/components/nav/components/NavView.svelte';
</script>

<nav class="flex h-full items-center justify-around w-full">
  <div class="flex grow h-full hover:nav:bg-gray-100 hover:nav:border-b-blue-600 hover:nav:text-blue-600 items-center ml-2 nav:border-b nav:border-b-transparent nav:h-full nav:px-4 nav:py-2 transition">
    <img alt="Logo" class="h-6 mr-2" src={ logo }>
    <NavFile />
    <NavEdit />
    <NavView />
    <NavEdit />
    <NavEdit />
    <NavEdit />
  </div>
  <a class="after:border-b-red-400 link mr-12 text-red-400" href="/">Back to Homepage</a>
</nav>
