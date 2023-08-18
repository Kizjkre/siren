<script lang="ts">
  export let name: string;
</script>

<div class="flex flex-col last:pb-0 pb-8">
  <p class="flex gap-2 items-center pb-1 text-gray-400 text-sm tracking-wider uppercase">
    <slot name="icon" />
    { name }
  </p>
  <div class="pl-4">
    <slot />
  </div>
</div>
