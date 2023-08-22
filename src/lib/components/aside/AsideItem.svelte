<script lang="ts">
  export let name: string;
</script>

<div class="flex flex-col last:pb-0 pb-8">
  <div class="aside-action:hover:block flex items-center justify-between">
    <p class="flex gap-2 items-center pb-1 text-gray-400 text-sm tracking-wider uppercase">
      <slot name="icon" />
      { name }
    </p>
    <button class="hidden hover:text-blue-600 text-gray-400" on:click>
      <slot name="action" />
    </button>
  </div>
  <div class="pl-4">
    <slot />
  </div>
</div>
