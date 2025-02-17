<script lang="ts">
  let { z }: { z?: number } = $props();
</script>

<div class="sheet-cover" style={z === undefined ? "" : `z-index: ${z};`}>
  <div class="contents-container">
    <slot />
  </div>
</div>

<style>
  .sheet-cover {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    min-height: 100%;
    @apply bg-surface-50-900-token;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
  }
  .contents-container {
    margin: 1rem auto 3rem auto;
    max-width: 50rem;
    padding: 0 1rem;
  }
</style>
