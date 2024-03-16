<script lang="ts">
  // @ts-ignore
  import bg1 from '$lib/assets/images/bg1.svg?raw';
  // noinspection TypeScriptCheckImport
  import IconAppWindow from '~icons/tabler/app-window';
  // noinspection TypeScriptCheckImport
  import IconNews from '~icons/tabler/news';
</script>

<div class="flex flex-col h-full md:flex-row w-full">
  <div class="basis-1/2 bg-[image:var(--bg)] bg-cover flex flex-col grow h-full justify-center px-8" style="--bg: url('data:image/svg+xml;base64,{ btoa(bg1) }')">
    <h1 class="font-bold md:text-6xl text-4xl">
      Sonification
      <br />
      Interface for
      <br />
      REmapping
      <br />
      Nature
    </h1>
    <h6>Designed at CCRMA at Stanford University</h6>
  </div>
  <div class="basis-1/2 bg-[#173740] flex flex-col grow px-8 py-4 text-white">
    <main class="flex flex-col justify-around grow">
      <a class="after:border-b-white flex items-center link md:text-5xl pb-2 text-2xl" href="workstation.html">
        <IconAppWindow class="h-12 w-12" />
        &nbsp;
        Go to Workstation
      </a>
      <div>
        <h2 class="flex items-center pb-2 relative w-fit">
          <IconNews />
          &nbsp;
          SIREN's Scholarship
        </h2>
        <!-- NOTE: auto-generated at https://zbib.org -->
        <!-- NOTE: 10.21785/icad2021.042, 10.21785/icad2023.6167 -->
        <div class="csl-bib-body" style="line-height: 1.5; margin-left: 2em; text-indent:-2em;">
          <div class="csl-entry">Peng, T., &amp; Choi, H. (2021). Siren: A case study in web audio based sonification. <i>Proceedings of the 26th International Conference on Auditory Display (ICAD 2021)</i>, 126–130. https://doi.org/10.21785/icad2021.042</div>
          <div class="csl-entry">Peng, T., Choi, H., &amp; Berger, J. (2023). Siren: Creative and extensible sonification on the web. <i>Proceedings of the 28th International Conference on Auditory Display (ICAD2023)</i>, 78–84. https://doi.org/10.21785/icad2023.6167</div>
        </div>
      </div>
    </main>
  </div>
</div>
