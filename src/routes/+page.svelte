<script lang="ts">
  // @ts-ignore
  import bg1 from '$lib/assets/images/bg1.svg?raw';
  // noinspection TypeScriptCheckImport
  import IconAppWindow from '~icons/tabler/app-window';
  // noinspection TypeScriptCheckImport
  import IconNews from '~icons/tabler/news';
  // noinspection TypeScriptCheckImport
  // @ts-ignore
  import { Cite } from '@citation-js/core';
  import DOMPurify from 'isomorphic-dompurify';
  import '@citation-js/plugin-csl';
  import '@citation-js/plugin-doi';

  const { sanitize } = DOMPurify;

  const siren2021: Promise<any> = Cite.async('10.21785/icad2021.042');
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
      <a class="after:border-b-white flex items-center link md:text-5xl pb-2 text-2xl" href="/workstation">
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
        { #await siren2021 }
          <div class="motion-safe:animate-pulse bg-gray rounded h-full w-6" />
          <div class="motion-safe:animate-pulse bg-gray rounded h-full w-6" />
          <div class="motion-safe:animate-pulse bg-gray rounded h-full w-6" />
          <div class="motion-safe:animate-pulse bg-gray rounded h-full w-6" />
        { :then bib }
          <p class="text-sm">
            {
              @html sanitize(bib.format('bibliography', {
                format: 'html',
                template: 'apa',
                lang: 'en-US'
              }))
            }
          </p>
        { /await }
      </div>
    </main>
  </div>
</div>
