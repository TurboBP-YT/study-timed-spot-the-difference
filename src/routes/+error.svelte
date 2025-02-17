<script lang="ts">
  import { onMount } from "svelte";

  let href: string;

  onMount(() => {
    href = window.location.href;
  });
</script>

<h1>404</h1>

<p>URL: {href}</p>

<p>
  <a href="/">Homepage</a>
</p>

<p>&copy; 2025 TurboBP</p>
