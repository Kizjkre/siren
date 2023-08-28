<script lang="ts">
  import MappingSandbox from '$lib/components/sandbox/SandboxWrapper.svelte';
  import { onDestroy } from 'svelte';
  // @ts-ignore
  import { browser } from '$app/environment';
  import { emitReturn } from '$lib/util/sandbox/useSandbox';
  import type { EventListenerCreator } from '$lib/util/definitions/listener';

  let message: { [id: string]: { data: any, name: string, script: string, process: string } } = {};

  const listener: EventListener = (e: CustomEventInit): any => message[e.detail.name + '-' + new Date().getTime()] = {
    ...e.detail
  };
  browser && document.addEventListener('siren-sandbox', listener);

  const handleResult: EventListenerCreator<[string]> =
    (name: string): EventListener => (e: CustomEventInit) => {
      console.log(message, name);
      emitReturn(message[name].name, e.detail);
      delete message[name];
      message = message; // NOTE: Reactivity
    };

  onDestroy((): any => browser && document.removeEventListener('siren-sandbox', listener));
</script>

{ #each Object.keys(message) as name (name) }
	<MappingSandbox
    message={ message[name].data }
    on:result={ handleResult(name) }
    process={ message[name].process }
    script={ message[name].script }
  />
{ /each }
