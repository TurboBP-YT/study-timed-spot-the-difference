<script module>
  const GOOGLE_FORM_URL_PARTIAL =
    "https://docs.google.com/forms/d/e/1FAIpQLScXgUcEQw_akJdwe5ATnnvbU8ZE_H3BZX-QzMgrGL7RSzXp8A/viewform?usp=pp_url&entry.1891982366=";
</script>

<script lang="ts">
  import Button from "../components/Button.svelte";

  let { participantUUID }: { participantUUID: string } = $props();
</script>

<h2>Section B</h2>
<p>
  Thank you for your participation in this study so far. There remains a last
  section of questions.
</p>
<p>
  Please press the button below to proceed to the Google Form (prefilled with a
  unique ID to link your form entries to your image task data) and finish this
  activity.
</p>
<div>
  <Button kind="forward" href={GOOGLE_FORM_URL_PARTIAL + participantUUID}
    >Final Questionaire</Button
  >
</div>
