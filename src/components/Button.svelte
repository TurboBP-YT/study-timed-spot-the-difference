<script lang="ts">
  type Kind = "nondirectional" | "forward" | "backward";
  type Size = "sm" | "md" | "lg" | "xl";
  let {
    onclick,
    kind = "nondirectional",
    size = "md",
    href,
    disabled = false,
  }: {
    onclick?: Function;
    kind?: Kind;
    size?: Size;
    href?: string;
    disabled?: boolean;
  } = $props();

  import ArrowRight from "~icons/mdi/arrow-right";
  import ArrowLeft from "~icons/mdi/arrow-left";
</script>

{#if href}
  <a
    class="btn variant-filled"
    href={disabled ? "#" : href}
    class:disabled
    onclick={(e) => (disabled ? [e.preventDefault(), false][1] : true)}
    target={window.location.hostname === new URL(href).hostname
      ? "_self"
      : "_blank"}
  >
    {#if kind === "backward"}<ArrowLeft></ArrowLeft>{/if}
    <slot />
    {#if kind === "forward"}<ArrowRight></ArrowRight>{/if}
  </a>
{:else}
  <button
    class="btn variant-filled"
    onclick={() => (onclick && !disabled ? onclick() : undefined)}
    {disabled}
  >
    {#if kind === "backward"}<ArrowLeft></ArrowLeft>{/if}
    <slot />
    {#if kind === "forward"}<ArrowRight></ArrowRight>{/if}
  </button>
{/if}

<style>
  .disabled,
  [disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }
</style>
