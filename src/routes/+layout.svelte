<script lang="ts">
  import bg1 from '$lib/assets/bg1.svg';
</script>

<div class="flex h-full items-center w-full">
  <div class="basis-1/2 bg-['{ bg1 }')] grow left">
    <nav>

    </nav>
    <div class="flex">
      <h1 class="font-bold text-6xl">Sonification Interface for REmapping Nature</h1>
    </div>
  </div>
  <div class="basis-1/2 grow">
    <main>
      <slot />
    </main>

    <footer></footer>
  </div>
</div>

<style lang="postcss">
  .left {
    @apply bg-center bg-contain;
  }
</style>
