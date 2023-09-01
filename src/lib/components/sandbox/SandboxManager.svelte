<script lang="ts">
  import Sandbox from '$lib/components/sandbox/Sandbox.svelte';
  import { onDestroy } from 'svelte';
  // @ts-ignore
  import { browser } from '$app/environment';
  import { emitReturn } from '$lib/util/sandbox/useSandbox';
  import type { EventListenerCreator } from '$lib/util/definitions/listener';

  let message: { [id: string]: { data: any, name: string, script: string, process: string } } = {};

  const listener: EventListener = (e: CustomEventInit): any => {
    if (e.detail.name in message) {
      message[e.detail.name].data = e.detail.data;
      return;
    }
    message[e.detail.name] = { ...e.detail };
  }
  browser && document.addEventListener('siren-sandbox', listener);

  const handleResult: EventListenerCreator<[string]> =
    (name: string): EventListener => (e: CustomEventInit) => {
      emitReturn(message[name].name, e.detail);
      delete message[name];
      message = message; // NOTE: Reactivity
    };

  onDestroy((): any => browser && document.removeEventListener('siren-sandbox', listener));
</script>

{ #each Object.keys(message) as name (name) }
	<Sandbox
    message={ message[name].data }
    on:result={ handleResult(name) }
    process={ message[name].process }
    script={ message[name].script }
  />
{ /each }
