<script lang="ts">
  import type { EventHandler } from 'svelte/elements';
  import sandbox from '$lib/stores/sandbox';
  import { dev } from '$app/environment';
  import { PUBLIC_SANDBOX as SANDBOX } from '$env/static/public';
  import type { Writable } from 'svelte/store';

  export let id: string;

  let port: MessagePort;
  let src: string = dev ? 'http://localhost:3000' : SANDBOX;
  let data: Writable<any> = $sandbox[id].data!;

  const handleLoad: EventHandler = (e: Event): any => {
    const channel: MessageChannel = new MessageChannel();
    port = channel.port1;

    port.onmessage = (e: MessageEvent): any => sandbox.result(id, e.data);

    const payload: {} = {
      action: $sandbox[id].action,
      data: $data,
      scripts: structuredClone($sandbox[id].scripts)
    };

    (e.target as HTMLIFrameElement).contentWindow!.postMessage({ action: 'init', payload }, src, [channel.port2]);
  };

  $: (port && $data) && port.postMessage($data);
</script>

<!-- NOTE: https://developer.chrome.com/blog/autoplay/#iframe_delegation -->
<iframe
  allow="autoplay; midi; geolocation; microphone; camera; display-capture; encrypted-media; clipboard-read; clipboard-write; notifications; payment-handler; persistent-storage; background-sync; ambient-light-sensor; accessibility-events;"
  class="hidden"
  on:load={ handleLoad }
  sandbox="allow-modals allow-forms allow-scripts allow-same-origin allow-popups allow-top-navigation-by-user-activation allow-downloads"
  { src }
  title="SIREN Sandbox"
/>
