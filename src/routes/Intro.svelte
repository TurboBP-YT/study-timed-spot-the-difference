<script lang="ts">
  import Button from "../components/Button.svelte";

  let { onNext }: { onNext: Function } = $props();
</script>

<h1>Timed “Spot the Difference” Task</h1>
<p>
  Welcome! This is a casual study on how quickly you can locate the object that
  appears and disappears when 2 images (one with the object, one without) are
  flashed alternating with blank frames in between.
</p>
<p>
  You’ll have 6 image-based tasks (including 1 practice round) to do.
  Afterwards, you’ll have a Google Forms survey to fill out that asks you about
  your eyesight (e.g. are you colorblind?), neurological conditions, and
  personality traits.
</p>
<p>Results will be posted on Reddit and YouTube.</p>
<p>
  <em>Est. Completion Time: 5 minutes</em>
</p>
<div>
  <Button kind="forward" onclick={onNext}>Answer Preliminary Questions</Button>
</div>
