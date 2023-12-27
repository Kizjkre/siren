<script lang="ts">
  import Sandbox from '$lib/components/sandbox/Sandbox.svelte';
  import sandbox from '$lib/stores/sandbox';
</script>

{ #each Object.keys($sandbox) as id (id) }
  <Sandbox { id } />
{ /each }
