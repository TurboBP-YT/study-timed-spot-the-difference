<script lang="ts">
  import Button from "../components/Button.svelte";

  let { onNext }: { onNext: Function } = $props();

  let checkboxIsChecked: boolean = $state(false);
</script>

<p>
  Participating in this study requires you to have enough visual acuity (with
  assistance (e.g. glasses and contacts) if applicable) to clearly percieve
  images on your screen (but <em>color</em> vision isn’t required). You cannot be
  legally blind.
</p>
<p>
  <label>
    <input type="checkbox" bind:checked={checkboxIsChecked} />
    <strong>
      Check this box to certify that you can read this text visually.
    </strong>
  </label>
</p>
<div>
  <Button kind="forward" onclick={onNext} disabled={!checkboxIsChecked}
    >Next</Button
  >
</div>
