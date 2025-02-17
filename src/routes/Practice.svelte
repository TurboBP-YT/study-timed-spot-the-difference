<script lang="ts">
  import Button from "../components/Button.svelte";

  let { onEnter }: { onEnter: Function } = $props();
</script>

<h2>Practice Round</h2>
<p>
  Image A and Image B are identical except for the presence/absence of one
  object. Image A will appear for 1 second, a blank frame will show for 1
  second, Image B will appear for 1 second, a blank frame will show for 1
  second, and so on and so forth.
</p>
<p>
  <strong>Directions:</strong> Click on the image where the object that appears and
  disappears is.
</p>
<div>
  <Button kind="forward" onclick={onEnter}>Start</Button>
</div>
