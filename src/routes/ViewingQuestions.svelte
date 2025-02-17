<script lang="ts">
  import Button from "../components/Button.svelte";
  import DistanceEntry from "../components/DistanceEntry.svelte";

  let {
    onNext,
    vwprtDiagAngleDeg,
  }: { onNext: Function; vwprtDiagAngleDeg: number } = $props();

  let checkboxIsChecked: boolean = $state(false);
</script>

<h2>Viewing Conditions: Apparent Size</h2>
<p class="mb-3">Please enter…</p>
<ol class="list mb-5">
  <li>
    <span>•</span><span class="flex-auto"
      >the <em>physical length</em> of the diagonal shown on the screen (corner to
      corner of browser viewport)</span
    >
  </li>
  <li><span>•</span><span class="flex-auto">your viewing distance</span></li>
</ol>
<div class="mb-5">
  <DistanceEntry name="Length of the Shown Diagonal"></DistanceEntry>
  <p class="mt-1 opacity-50">
    <small>Optional</small>
  </p>
</div>
<div class="mb-5">
  <DistanceEntry name="View Distance"></DistanceEntry>
  <p class="mt-1 opacity-50">
    <small>Optional</small>
  </p>
</div>
<div>
  <Button kind="forward" onclick={onNext}>Next</Button>
</div>

<img
  src="/green-arrow.png"
  class="overlay-arrow-diagonal"
  alt="viewport diagonal"
  style={`transform: translate(-50%, -50%) rotate(${vwprtDiagAngleDeg}deg);`}
/>

<style>
  .overlay-arrow-diagonal {
    width: calc(99 * var(--vd));
    mix-blend-mode: multiply;
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 1000;
    pointer-events: none;
    max-width: none;
    animation: pulse 0.5s ease-in-out 1s 10 alternate both;
  }
  @keyframes pulse {
    from {
      width: calc(99 * var(--vd));
    }
    to {
      width: calc(100 * var(--vd));
    }
  }
</style>
