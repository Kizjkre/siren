<script lang="ts">
  import module from '$lib/util/sandbox/module?raw';
  import doc from '$lib/util/sandbox/srcdoc.html?raw';

  const srcdoc: string = doc.replace('%script%', `
    ${ module }
    // module();
  `);
</script>

<iframe
  allow="autoplay"
  class="hidden"
  sandbox="allow-scripts"
  title="Sandbox"
  { srcdoc }
/>
