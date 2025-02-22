<script lang="ts">
  import { onMount } from "svelte";

  import {
    viewportDiagonalHundredthInPixels,
    isDeviceDetectedMobile,
  } from "../store";
  import { CIRC_IMAGE_DIAM_DIAG_RATIO } from "../routes/+page.svelte";

  let {
    imagesPairName,
    targetX,
    targetY,
    targetDiameter,
    onPassImmediate,
    onPassAfterDelay,
  }: {
    imagesPairName: string;
    targetX: number;
    targetY: number;
    targetDiameter: number;
    onPassImmediate: Function;
    onPassAfterDelay: Function;
  } = $props();

  let isShowAnswerMode: boolean = $state(false);

  let counter: number = $state(0);
  function step() {
    counter++;
  }

  const TARGET_DIAMETER_ADJUSTMENT_FACTORS = [1, 1.125, 1.25];
  const DUR_POST_PASS_ANSWER_DISPLAY_S = 2.5;
  const DUR_FLASH_INTERVAL_S = 1.0;

  let nTries: number = $state(0);
  let tStart: number;
  let tEnd: number;
  let adjustedTargetDiameter: number = $derived(
    targetDiameter *
      TARGET_DIAMETER_ADJUSTMENT_FACTORS[
        Math.min(TARGET_DIAMETER_ADJUSTMENT_FACTORS.length - 1, nTries)
      ]
  );
  onMount(() => {
    tStart = Date.now();
    setInterval(step, 1000 * DUR_FLASH_INTERVAL_S);
  });

  function distance(x1: number, y1: number, x2: number, y2: number): number {
    return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
  }

  function spawnPopup(clientX: number, clientY: number, isCorrect: boolean) {
    const el = document.createElement("img");
    el.src = `/popup-icons/${isCorrect ? "check" : "wrong"}.png`;
    el.classList.add("popup-icon");
    el.style.left = clientX + "px";
    el.style.top = clientY + "px";
    document.body.appendChild(el);
    setTimeout(() => {
      document.body.removeChild(el);
    }, 100000);
  }

  let clickCatchElement: HTMLDivElement;

  function onClick(e: MouseEvent) {
    if (isShowAnswerMode) {
      return;
    }

    nTries += 1;

    const clickX = e.clientX;
    const clickY = e.clientY;
    /*
    const ctrX = window.innerWidth / 2;
    const ctrY = window.innerHeight / 2;
    const d =
      100 * CIRC_IMAGE_DIAM_DIAG_RATIO * $viewportDiagonalHundredthInPixels;

    if (distance(clickX, clickY, ctrX, ctrY) > d / 2) {
      return; // clicked outside circle
    }

    const clickXrel = (clickX - (ctrX - d / 2)) / d;
    const clickYrel = (clickY - (ctrY - d / 2)) / d;
    */

    const rect: DOMRect = clickCatchElement.getBoundingClientRect();
    const clickXrel: number = (clickX - rect.left) / rect.width;
    const clickYrel: number = (clickY - rect.right) / rect.height;

    const MOBILE_TAP_TARGET_SIZE_FACTOR = 1.5;
    if (
      distance(clickXrel, clickYrel, targetX, targetY) >
      (adjustedTargetDiameter *
        ($isDeviceDetectedMobile ? MOBILE_TAP_TARGET_SIZE_FACTOR : 1)) /
        2
    ) {
      spawnPopup(clickX, clickY, false);
      return; // clicked outside target zone
    }

    spawnPopup(clickX, clickY, true);

    isShowAnswerMode = true;

    tEnd = Date.now();
    onPassImmediate(tStart, tEnd, nTries);
    setTimeout(onPassAfterDelay, 1000 * DUR_POST_PASS_ANSWER_DISPLAY_S);
  }
</script>

<div
  class="backdrop"
  style={`background:${isShowAnswerMode ? "green" : "black"};`}
>
  <img
    src={`/study/${imagesPairName}-a.jpg`}
    class="circle-img"
    class:show={counter % 4 == 1 || isShowAnswerMode}
    alt="a"
  />
  <img
    src={`/study/${imagesPairName}-b.jpg`}
    class="circle-img"
    class:show={counter % 4 == 3 || isShowAnswerMode}
    class:animate={isShowAnswerMode}
    alt="b"
  />
  <div
    class="click-catch"
    on:click={onClick}
    bind:this={clickCatchElement}
  ></div>
</div>

<style>
  .backdrop {
    position: fixed;
    z-index: 200;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: black;
    /*display: flex;
    justify-content: center;
    align-items: center;*/
    box-shadow: 0 0 0 calc(100 * var(--vd)) black;
  }
  .circle-img,
  .click-catch {
    overflow: hidden;
    border-radius: 50%;
    width: calc(40 * var(--vd));
    height: calc(40 * var(--vd));
    user-select: none;
    pointer-events: none;
    display: none;
    visibility: hidden;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .click-catch {
    pointer-events: all !important;
    display: block !important;
    visibility: visible !important;
  }
  .show {
    display: initial !important;
    visibility: visible !important;
  }
  .circle-img.animate {
    animation: fade 0.25s ease-in-out infinite alternate both;
  }

  :global(.popup-icon) {
    user-select: none;
    pointer-events: none;
    z-index: 500;
    width: 3rem;
    height: 3rem;
    margin-top: -1.5rem;
    margin-left: -1.5rem;
    position: absolute;
    left: 50vw;
    top: 50vh;
    animation:
      fade 0.5s ease-out both,
      drift 0.5s linear both;
  }

  @keyframes fade {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  @keyframes drift {
    from {
      margin-top: -1.5rem;
    }
    to {
      margin-top: -3rem;
    }
  }
</style>
