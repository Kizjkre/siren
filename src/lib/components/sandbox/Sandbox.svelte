<script lang="ts">
  // @ts-ignore
  import portCode from '$lib/util/sandbox/port?raw';
  // @ts-ignore
  import html from '$lib/util/sandbox/sandbox.html?raw';
  import type { EventHandler } from 'svelte/elements';
  import { createEventDispatcher, type EventDispatcher } from 'svelte';

  export let action: string;
  export let input: any;
  export let userscript: string;

  const doc: Document = new DOMParser().parseFromString(html, 'text/html');
  const userscriptEl: HTMLScriptElement = doc.createElement('script');
  const portEl: HTMLScriptElement = doc.createElement('script');
  const actionEl: HTMLScriptElement = doc.createElement('script');

  userscriptEl.type = 'inline-module';
  portEl.type = 'inline-module';
  actionEl.type = 'inline-module';

  userscriptEl.id = 'userscript';
  portEl.id = 'port';

  userscriptEl.textContent = userscript;
  portEl.textContent = portCode;
  actionEl.textContent = action;

  doc.body.append(userscriptEl, portEl, actionEl);

  const srcdoc: string = doc.documentElement.outerHTML;

  const dispatch: EventDispatcher<any> = createEventDispatcher();

  let port: MessagePort;
  const handleLoad: EventHandler = (e: Event): any => {
    const channel: MessageChannel = new MessageChannel();
    port = channel.port1;

    port.onmessage = (e: MessageEvent): any => dispatch('result', e.data);

    (e.target as HTMLIFrameElement).contentWindow!.postMessage('', '*', [channel.port2]);
  };

  $: (port && input) && port.postMessage(input);
</script>

<!-- REF: https://stackoverflow.com/a/75529235 -->
<svelte:options immutable />

<iframe
  allow="autoplay"
  class="hidden"
  on:load={ handleLoad }
  sandbox="allow-scripts"
  { srcdoc }
  title="Sandbox"
/>
