<script lang="ts">
  import Sandbox from '$lib/components/sandbox/Sandbox.svelte';
  import type { EventListenerCreator } from '$lib/util/definitions/listener';
  import sandbox from '$lib/stores/sandbox';

  const handleResult: EventListenerCreator<[string]> =
    (id: string): EventListener => (e: CustomEventInit) =>
      sandbox.result(id, e.detail);
</script>

{ #each Object.keys($sandbox) as id (id) }
	<Sandbox
    action={ $sandbox[id].action }
    input={ $sandbox[id].data }
    on:result={ handleResult(id) }
    userscript={ $sandbox[id].script }
  />
{ /each }
