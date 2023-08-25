<script lang="ts">
  import Aside from '$lib/components/aside/Aside.svelte';
  import Footer from '$lib/components/footer/Footer.svelte';
  import Main from '$lib/components/main/Main.svelte';
  import Nav from '$lib/components/nav/Nav.svelte';
  import sidebar from '$lib/stores/sidebar';
  import sampleData from '$lib/util/init/sampleData';
  import firstTrack from '$lib/util/init/firstTrack';
  import clickOutsideListener from '$lib/util/clickOutside';
  import defaultMapping from '$lib/util/init/defaultMapping';
  import defaultSynth from '$lib/util/init/defaultSynth';
  import MappingSandboxStore from '$lib/components/sandbox/SandboxManager.svelte';
  import initAce from '$lib/util/init/initAce';

  defaultMapping();
  defaultSynth();
  firstTrack();
  sampleData();
  initAce();

  const handleBeforeUnload: OnBeforeUnloadEventHandler = (e: BeforeUnloadEvent): void =>
    e.returnValue = '';
</script>

<svelte:window on:beforeunload|preventDefault={ handleBeforeUnload } />
<svelte:document on:click={ clickOutsideListener } />

<svelte:head>
  <title>Workstation | SIREN</title>
</svelte:head>

<div class="grid h-full select-none w-full">
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

<MappingSandboxStore />

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
    grid-template-rows: minmax(0, 0.75fr) minmax(0, 8.25fr) minmax(0, 1fr);
  }

  main {
    @apply bg-white;
    grid-area: main;
  }

  nav {
    grid-area: nav;
  }
</style>
