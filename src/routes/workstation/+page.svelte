<script>
  import Aside from '$lib/components/aside/Aside.svelte';
  import Footer from '$lib/components/footer/Footer.svelte';
  import Main from '$lib/components/main/Main.svelte';
  import Nav from '$lib/components/nav/Nav.svelte';
  import sidebar from '$lib/stores/sidebar';
  import onWorkstationMount from '$lib/util/onWorkstationMount';

  onWorkstationMount();
</script>

<svelte:head>
  <title>Workstation | SIREN</title>
</svelte:head>

<div class="grid h-full w-full">
  <nav>
    <Nav />
  </nav>
  <aside class:!w-0={ !$sidebar }>
    <Aside />
  </aside>
  <main>
    <Main />
  </main>
  <footer>
    <Footer />
  </footer>
</div>

<style lang="postcss">
  aside {
    @apply transition-all w-[20vw];
    grid-area: aside;
  }

  footer {
    grid-area: footer;
  }

  .grid {
    grid-template-areas:
      'nav nav'
      'aside main'
      'footer footer';
    grid-template-columns: auto minmax(0, 1fr);
    grid-template-rows: minmax(0, 0.5fr) minmax(0, 7.5fr) minmax(0, 2fr);
  }

  main {
    @apply bg-white;
    grid-area: main;
  }

  nav {
    grid-area: nav;
  }
</style>
