<script lang="ts">
  import type { EventHandler } from 'svelte/elements';
  import sandbox from '$lib/stores/sandbox';

  export let id: string;

  let port: MessagePort;

  const handleLoad: EventHandler = (e: Event): any => {
    const channel: MessageChannel = new MessageChannel();
    port = channel.port1;

    port.onmessage = (e: MessageEvent): any =>
      e.data.action === 'close' && sandbox.result(id, e.data.payload);

    (e.target as HTMLIFrameElement).contentWindow!.postMessage({ action: 'init', payload: $sandbox[id] }, `${ window.location.protocol }//${ window.location.hostname }:3000`, [channel.port2]);
  };

  $: (port && $sandbox[id].data) && port.postMessage($sandbox[id].data);
</script>

<!-- REF: https://stackoverflow.com/a/75529235 -->
<svelte:options immutable />

<iframe
  allow="midi; geolocation; microphone; camera; display-capture; encrypted-media; clipboard-read; clipboard-write; notifications; payment-handler; persistent-storage; background-sync; ambient-light-sensor; accessibility-events;"
  class="hidden"
  on:load={ handleLoad }
  sandbox="allow-modals allow-forms allow-scripts allow-same-origin allow-popups allow-top-navigation-by-user-activation allow-downloads"
  src="http://localhost:3000"
  title="SIREN Sandbox"
/>
