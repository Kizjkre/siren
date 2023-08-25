<script lang="ts">
  // @ts-ignore
  import frameMessage from '$lib/util/sandbox/message?raw';
  // @ts-ignore
  import html from '$lib/util/sandbox/sandbox.html?raw';
  import message from '$lib/actions/message';
  // @ts-ignore
  import module from '$lib/util/sandbox/module?raw';
  // @ts-ignore
  import reset from '$lib/util/sandbox/reset?raw';
  import { createEventDispatcher, type EventDispatcher, onDestroy } from 'svelte';
  // @ts-ignore
  import { browser } from '$app/environment';

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

  const dispatch: EventDispatcher<{ [key: string]: MessagePort }> = createEventDispatcher();

  // REF: https://stackoverflow.com/q/49226309
  const listener: EventListener = (e: CustomEventInit<MessagePort>): any => dispatch('port', e.detail!);

  browser && document.addEventListener('siren-port', listener);

  onDestroy((): void => browser && document.removeEventListener('siren-port', listener));
</script>

<iframe
  allow="autoplay"
  class="hidden"
  sandbox="allow-scripts"
  { srcdoc }
  title="Sandbox"
  use:message
/>
