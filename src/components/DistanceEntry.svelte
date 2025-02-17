<script lang="ts">
  let { name, units = ["cm", "in"] }: { name: string; units?: Array<string> } =
    $props();

  function hyphenateFormat(s: string): string {
    return s.replace(" ", "-").toLowerCase();
  }

  let attrName = $derived(hyphenateFormat(name));
  let attrNameRadio = $derived(attrName + "-unit");
</script>

<label>
  <h3 class="mb-2">{name}:</h3>
  <div class="mb-2">
    <input type="number" />
  </div>
</label>
<div class="flex">
  {#each units as u}
    <label class="me-4">
      <input type="radio" name={attrNameRadio} value={u} />
      {u}
    </label>
  {/each}
</div>
