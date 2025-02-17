<script lang="ts">
  import Button from "../components/Button.svelte";

  let {
    onEnter,
    taskNumber,
    nTasksAll,
  }: { onEnter: Function; taskNumber: number; nTasksAll: number } = $props();
</script>

<h2>Timed Task {taskNumber} ({nTasksAll - taskNumber} Remain After This)</h2>
<p>Please continue.</p>
<p>
  <strong>Directions:</strong> Click on the image where the object that appears and
  disappears is.
</p>
<div>
  <Button kind="forward" onclick={onEnter}>Start</Button>
</div>
