<script lang="ts">
  import Header from '$lib/components/main/track/Header.svelte';
  import { slide } from 'svelte/transition';
  import Body from '$lib/components/main/track/Body.svelte';

  export let id: number;
</script>

<div class="border-b box-content flex h-track" transition:slide>
  <Header { id } />
  <Body { id } />
</div>
