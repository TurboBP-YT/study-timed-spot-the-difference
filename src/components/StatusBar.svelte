<script lang="ts">
  import { ProgressBar } from "@skeletonlabs/skeleton";

  let { value, max }: { value: number; max: number } = $props();
</script>

<header>
  <div>
    <ProgressBar
      {value}
      {max}
      height="h-2"
      meter="bg-surface-900-50-token"
      track="bg-surface-200-700-token"
      rounded="rounded-token"
    ></ProgressBar>
  </div>
</header>

<style>
  header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    margin-top: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
  }
  div {
    width: 50%;
  }
</style>
