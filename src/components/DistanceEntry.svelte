<script module>
  export type MeasurementUnit = "in" | "cm";
</script>

<script lang="ts">
  let {
    name,
    value = $bindable(),
    unit = $bindable(),
  }: {
    name: string;
    value: string;
    unit: MeasurementUnit;
  } = $props();

  function hyphenateFormat(s: string): string {
    return s.replace(" ", "-").toLowerCase();
  }

  let attrName = $derived(hyphenateFormat(name));
  let attrNameRadio = $derived(attrName + "-unit");
</script>

<label>
  <h3 class="mb-2">{name}:</h3>
  <div class="mb-2">
    <input type="number" bind:value />
  </div>
</label>
<div class="flex">
  {#each ["in", "cm"] as u}
    <label class="me-4">
      <input type="radio" name={attrNameRadio} value={u} bind:group={unit} />
      {u}
    </label>
  {/each}
</div>
