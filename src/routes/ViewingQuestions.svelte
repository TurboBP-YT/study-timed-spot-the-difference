<script lang="ts">
  import Button from "../components/Button.svelte";
  import DistanceEntry, {
    type MeasurementUnit,
  } from "../components/DistanceEntry.svelte";

  let {
    onNext,
    vwprtDiagAngleDeg,

    input_viewportDiagonal = $bindable(),
    input_viewportDiagonalUnit = $bindable(),
    input_screenEyeDistance = $bindable(),
    input_screenEyeDistanceUnit = $bindable(),
  }: {
    onNext: Function;
    vwprtDiagAngleDeg: number;
    input_viewportDiagonal: string;
    input_viewportDiagonalUnit: MeasurementUnit;
    input_screenEyeDistance: string;
    input_screenEyeDistanceUnit: MeasurementUnit;
  } = $props();
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
  <DistanceEntry
    name="Length of the Shown Diagonal"
    bind:value={input_viewportDiagonal}
    bind:unit={input_viewportDiagonalUnit}
  ></DistanceEntry>
  <p class="mt-1 opacity-50">
    <small>Optional</small>
  </p>
</div>
<div class="mb-5">
  <DistanceEntry
    name="View Distance"
    bind:value={input_screenEyeDistance}
    bind:unit={input_screenEyeDistanceUnit}
  ></DistanceEntry>
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
