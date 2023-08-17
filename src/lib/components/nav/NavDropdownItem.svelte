<script lang="ts">
  export let onClick: Event;
</script>

<button class="border-x border-x-transparent flex gap-2 hover:bg-gray-100 hover:border-l-blue-600 hover:text-blue-600 items-center px-4 py-2" on:click={ onClick }>
  <slot name="icon" />
  <slot />
</button>
