<script lang="ts">
  import { onMount } from "svelte";
  import Cover from "../components/Cover.svelte";
  import Button from "../components/Button.svelte";

  let href: string;

  onMount(() => {
    href = window.location.href;
  });
</script>

<Cover>
  <h1>404</h1>

  <p>URL: {href}</p>

  <p>
    <Button href="/">Homepage</Button>
  </p>

  <p>&copy; 2025 TurboBP</p>
</Cover>
