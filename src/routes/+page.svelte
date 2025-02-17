<script module>
  export const CIRC_IMAGE_DIAM_DIAG_RATIO: number = 1 / 3;

  function shuffle(array: Array<any>) {
    // https://stackoverflow.com/a/2450976
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
  }
  const BANK_IMAGES_NAMES = ["boat", "leaf", "sign", "keys", "plant"];
  shuffle(BANK_IMAGES_NAMES);
  BANK_IMAGES_NAMES.unshift("apple");

  interface ImagesInfo {
    [key: string]: { [key: string]: number };
  }

  const BANK_IMAGES_INFO: ImagesInfo = {
    apple: {
      targetX: 0.5,
      targetY: 0.5,
      targetDiameter: 0.1,
    },
    boat: {
      targetX: 0.5,
      targetY: 0.5,
      targetDiameter: 0.1,
    },
    leaf: {
      targetX: 0.5,
      targetY: 0.5,
      targetDiameter: 0.1,
    },
    sign: {
      targetX: 0.5,
      targetY: 0.5,
      targetDiameter: 0.1,
    },
    keys: {
      targetX: 0.5,
      targetY: 0.5,
      targetDiameter: 0.1,
    },
    plant: {
      targetX: 0.5,
      targetY: 0.5,
      targetDiameter: 0.1,
    },
  };
</script>

<script lang="ts">
  import type { PageProps } from "./$types";
  let { data }: PageProps = $props();

  import { onMount } from "svelte";
  import { readable, writable, type Writable } from "svelte/store";

  import { viewportDiagonalHundredthInPixels } from "../store";

  import StatusBar from "../components/StatusBar.svelte";
  import NoticeUnsupported from "./NoticeUnsupported.svelte";
  import Cover from "../components/Cover.svelte";
  import Intro from "./Intro.svelte";
  import AccessibilityScreeningQuestions from "./AccessibilityScreeningQuestions.svelte";
  import ViewingQuestions from "./ViewingQuestions.svelte";
  import Outro from "./Outro.svelte";
  import Practice from "./Practice.svelte";
  import MainSequence from "./MainSequence.svelte";
  import Button from "../components/Button.svelte";
  import FullScreenViewer from "../components/FullScreenViewer.svelte";
  import { ProgressRadial } from "@skeletonlabs/skeleton";

  const N_Q_PRACTICE: number = 1;
  const N_Q_NONPRACTICE: number = 5;
  const N_OTHER_STEPS: number = 2;

  let vwprtDiagAngleDeg: number = $state(45);

  let nStepsDone: number = $state(0);
  let indexCurrentScreen: number = $state(0);

  let isAspectRatioSupported: boolean = $state(true);

  function updateViewportDiagonalHundredthInPixels() {
    const diagonalInPixels: number = Math.sqrt(
      window.innerWidth ** 2 + window.innerHeight ** 2
    );
    const vd: number = diagonalInPixels / 100;
    document.documentElement.style.setProperty("--vd", vd + "px");
    viewportDiagonalHundredthInPixels.set(vd);

    // const aspectShortEdgeToLongEdge: number =
    //  Math.min(window.innerWidth, window.innerHeight) /
    //  Math.max(window.innerWidth, window.innerHeight);

    isAspectRatioSupported =
      diagonalInPixels * CIRC_IMAGE_DIAM_DIAG_RATIO <
      Math.min(window.innerWidth, window.innerHeight);

    vwprtDiagAngleDeg =
      (Math.atan2(window.innerHeight, window.innerWidth) / Math.PI) * 180;
  }

  onMount(() => {
    updateViewportDiagonalHundredthInPixels();
    window.addEventListener("resize", updateViewportDiagonalHundredthInPixels);
  });

  function onNext(doAdvanceProgressMeter: boolean = true) {
    indexCurrentScreen++;
    nCurrentSectionTasksDone = 0;
    if (doAdvanceProgressMeter) {
      nStepsDone++;
    }
  }

  type SingleImageTaskData = {
    order: number;
    image: string;
    tStart: number;
    tEnd: number;
    tDur: number;
    nTries: number;
  };
  const imageTasksData: Array<SingleImageTaskData> = [];
  const userInputData = {
    viewportDiagonalInMeters: 0,
    viewDistanceInMeters: 0,
  };

  let indexCurrentImage: number = $state(0);
  let nCurrentSectionTasksDone: number = 0;
  function recordImageTaskPerformance(
    tStart: number,
    tEnd: number,
    nTries: number
  ) {
    const tDur: number = tEnd - tStart;
    imageTasksData.push({
      order: indexCurrentImage,
      image: BANK_IMAGES_NAMES[indexCurrentImage],
      tStart,
      tEnd,
      tDur,
      nTries,
    });
    nCurrentSectionTasksDone++;
    nStepsDone++;
  }

  let nAttemptedServerUpdates = 0;
  async function pushData() {
    const payload = {
      performance: imageTasksData,
      environment: userInputData,
      nthShipment: nAttemptedServerUpdates,
    };
    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      await response.text();
    } catch (error) {
      console.error("Fetching error:", error);
    }
    nAttemptedServerUpdates++;
  }

  let participantUUID: string = $derived(data.participantUUID);

  let doesTaskCompletionAdvanceSections: boolean = $state(false);
  let isViewerEnabled: boolean = $state(false);
  function presentTask(n: number) {
    doesTaskCompletionAdvanceSections = nCurrentSectionTasksDone + 1 >= n;
    isViewerEnabled = true;
  }
</script>

<svelte:head>
  <link rel="preload" href="/spinner.gif" as="image" />
  <link rel="preload" href="/green-arrow.png" as="image" />
  <link rel="preload" href="/popup-icons/check.png" as="image" />
  <link rel="preload" href="/popup-icons/wrong.png" as="image" />
  {#each BANK_IMAGES_NAMES as nameImg}
    <link rel="preload" href={`/study/${nameImg}-a.jpg`} as="image" />
    <link rel="preload" href={`/study/${nameImg}-b.jpg`} as="image" />
  {/each}
</svelte:head>

{#if participantUUID.length}
  <StatusBar
    value={nStepsDone}
    max={N_OTHER_STEPS + N_Q_PRACTICE + N_Q_NONPRACTICE}
  ></StatusBar>

  <main>
    <Cover>
      {#if indexCurrentScreen === 0}
        <Intro onNext={() => onNext(false)}></Intro>
      {:else if indexCurrentScreen === 1}
        <AccessibilityScreeningQuestions {onNext}
        ></AccessibilityScreeningQuestions>
      {:else if indexCurrentScreen === 2}
        <ViewingQuestions {onNext} {vwprtDiagAngleDeg}></ViewingQuestions>
      {:else if indexCurrentScreen === 3}
        <Practice
          onEnter={() => {
            presentTask(N_Q_PRACTICE);
          }}
        ></Practice>
      {:else if indexCurrentScreen === 4}
        <MainSequence
          onEnter={() => {
            presentTask(N_Q_NONPRACTICE);
          }}
          taskNumber={indexCurrentImage - N_Q_PRACTICE}
          nTasksAll={N_Q_NONPRACTICE}
        ></MainSequence>
      {:else if indexCurrentScreen === 5}
        <Outro></Outro>
      {/if}
    </Cover>
  </main>

  {#if isViewerEnabled}
    {#key indexCurrentImage}
      <FullScreenViewer
        imagesPairName={BANK_IMAGES_NAMES[indexCurrentImage]}
        targetX={BANK_IMAGES_INFO[BANK_IMAGES_NAMES[indexCurrentImage]].targetX}
        targetY={BANK_IMAGES_INFO[BANK_IMAGES_NAMES[indexCurrentImage]].targetY}
        targetDiameter={BANK_IMAGES_INFO[BANK_IMAGES_NAMES[indexCurrentImage]]
          .targetDiameter}
        onPass={doesTaskCompletionAdvanceSections
          ? (tStart: number, tEnd: number, nTries: number) => {
              recordImageTaskPerformance(tStart, tEnd, nTries);
              onNext(false);
            }
          : recordImageTaskPerformance}
      ></FullScreenViewer>
    {/key}
  {/if}
{:else}
  <Cover>
    <img src="/spinner.gif" alt="loading" class="spin spinner" />
  </Cover>
{/if}

{#if !isAspectRatioSupported}
  <Cover z={100000}><NoticeUnsupported></NoticeUnsupported></Cover>
{/if}

<style>
  main {
    position: absolute;
    top: 2rem;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .spinner {
    width: 5rem;
  }
</style>
