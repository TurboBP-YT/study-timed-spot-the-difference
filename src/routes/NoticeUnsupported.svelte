<script lang="ts">
  import Button from "../components/Button.svelte";

  function goBack() {
    window.history.back();
  }
</script>

<h2>Sorry</h2>
<p>
  Unfortunately, your window aspect ratio is unsupported, so you can’t
  participate in this study.
</p>
<div>
  <Button kind="backward" onclick={goBack}>Go Back</Button>
</div>
