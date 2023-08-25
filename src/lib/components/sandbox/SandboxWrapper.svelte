<script lang="ts">
  import Sandbox from '$lib/components/sandbox/Sandbox.svelte';
  import { createEventDispatcher, type EventDispatcher } from 'svelte';

  type Any = { [key: string]: any };

  export let message: any;
  export let process: string;
  export let script: string;

  let port: MessagePort;

  const dispatch: EventDispatcher<Any> = createEventDispatcher();

  const handlePort: EventListener = (e: CustomEventInit): void => {
    port = e.detail;

    port.onmessage = (e: MessageEvent): any => dispatch('result', e.data);
  };

  $: (message && port) && port.postMessage(message);
</script>

<Sandbox on:port={ handlePort } { process } { script } />
