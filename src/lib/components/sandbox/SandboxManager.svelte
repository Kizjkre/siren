<script lang="ts">
  import Sandbox from '$lib/components/sandbox/Sandbox.svelte';
  import { onDestroy } from 'svelte';
  // @ts-ignore
  import { browser } from '$app/environment';
  import { emitReturn } from '$lib/util/sandbox/useSandbox';
  import type { EventListenerCreator } from '$lib/util/definitions/listener';

  // NOTE: let for reactivity
  let sandboxes: SandboxStore = {};

  const listener: EventListener = (e: CustomEventInit): any => {
    if (e.detail.name in sandboxes) {
      sandboxes[e.detail.name].data = e.detail.data;
      return;
    }
    sandboxes[e.detail.name] = { ...e.detail };
  }
  browser && document.addEventListener('siren-sandbox', listener);

  const handleResult: EventListenerCreator<[string]> =
    (name: string): EventListener => (e: CustomEventInit) => {
      emitReturn(sandboxes[name].name, e.detail);
      delete sandboxes[name];
      sandboxes = sandboxes; // NOTE: Reactivity
    };

  onDestroy((): any => browser && document.removeEventListener('siren-sandbox', listener));
</script>

{ #each Object.keys(sandboxes) as name (name) }
	<Sandbox
    action={ sandboxes[name].action }
    input={ sandboxes[name].data }
    on:result={ handleResult(name) }
    userscript={ sandboxes[name].script }
  />
{ /each }
