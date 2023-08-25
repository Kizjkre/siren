<script lang="ts">
  import MappingSandbox from '$lib/components/sandbox/SandboxWrapper.svelte';
  import { onDestroy } from 'svelte';
  // @ts-ignore
  import { browser } from '$app/environment';
  import { emitReturn } from '$lib/util/sandbox/useSandbox';

  let message: { [id: number]: { data: any, name: string, script: string, process: string } } = {};

  const listener: EventListener = (e: CustomEventInit): any => message[new Date().getTime()] = {
    data: e.detail.data,
    name: e.detail.name,
    script: e.detail.script,
    process: e.detail.process
  };
  browser && document.addEventListener('siren-sandbox', listener);

  const handleResult: EventListenerCreator<number> =
    (id: number): EventListener => (e: CustomEventInit) => {
      emitReturn(message[id].name, e.detail);
      delete message[id];
      message = message; // NOTE: Reactivity
    };

  onDestroy((): any => browser && document.removeEventListener('siren-sandbox', listener));
</script>

{ #each Object.keys(message) as id (id) }
	<MappingSandbox
    message={ message[+id].data }
    on:result={ handleResult(+id) }
    process={ message[+id].process }
    script={ message[+id].script }
  />
{ /each }
