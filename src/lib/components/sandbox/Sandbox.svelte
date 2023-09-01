<script lang="ts">
  // @ts-ignore
  import frameMessage from '$lib/util/sandbox/message?raw';
  // @ts-ignore
  import html from '$lib/util/sandbox/sandbox.html?raw';
  // @ts-ignore
  import module from '$lib/util/sandbox/module?raw';
  // @ts-ignore
  import reset from '$lib/util/sandbox/reset?raw';
  import type { EventHandler } from 'svelte/elements';
  import { createEventDispatcher, type EventDispatcher } from 'svelte';

  export let message: string;
  export let process: string;
  export let script: string;

  let srcdoc: string;
  $: srcdoc = html.replace('// Script', `
    ${ frameMessage }
    message(() => {
      ${ module }
      module(\`${ reset }\` + atob('${ btoa(script) }'), url => \`${ process.replace('\'<URL>\'', '\'` + url + `\'') }\`);
    });
  `);

  const dispatch: EventDispatcher<any> = createEventDispatcher();


  let port: MessagePort;
  const handleLoad: EventHandler = (e: Event): any => {
    const channel: MessageChannel = new MessageChannel();
    port = channel.port1;

    port.onmessage = (e: MessageEvent): any => dispatch('result', e.data);

    (e.target as HTMLIFrameElement).contentWindow!.postMessage('', '*', [channel.port2]);
  };

  $: (port && message) && port.postMessage(message);
</script>

<iframe
  allow="autoplay"
  class="hidden"
  on:load={ handleLoad }
  sandbox="allow-scripts"
  { srcdoc }
  title="Sandbox"
/>
