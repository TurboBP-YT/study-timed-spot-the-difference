<script module>
  export const CIRC_IMAGE_DIAM_DIAG_RATIO: number = 2 / 5;

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
  const BANK_IMAGES_NAMES = [
    "orchard",
    "bookshelves",
    "skull",
    "boats",
    "jigsaw",
  ];
  shuffle(BANK_IMAGES_NAMES);
  BANK_IMAGES_NAMES.unshift("home");

  interface ImagesInfo {
    [key: string]: { [key: string]: number };
  }

  const BANK_IMAGES_INFO: ImagesInfo = {
    orchard: {
      targetX: 0.279,
      targetY: 0.73,
      targetDiameter: 0.198,
    },
    bookshelves: {
      targetX: 0.616,
      targetY: 0.96,
      targetDiameter: 0.1,
    },
    skull: {
      targetX: 0.31,
      targetY: 0.812,
      targetDiameter: 0.1,
    },
    boats: {
      targetX: 0.113,
      targetY: 0.403,
      targetDiameter: 0.1,
    },
    jigsaw: {
      targetX: 0.895,
      targetY: 0.273,
      targetDiameter: 0.105,
    },
    home: {
      targetX: 0.738,
      targetY: 0.83,
      targetDiameter: 0.15,
    },
  };

  function silentFailParseFloat(s: string): number {
    let pfResult = parseFloat(s);
    if (isNaN(pfResult)) {
      return 0;
    }
    return pfResult;
  }
</script>

<script lang="ts">
  import type { PageProps } from "./$types";
  let { data }: PageProps = $props();

  import { onMount } from "svelte";
  import { readable, writable, type Writable } from "svelte/store";

  import {
    isDeviceDetectedMobile,
    viewportDiagonalHundredthInPixels,
  } from "../store";

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
  import type { MeasurementUnit } from "../components/DistanceEntry.svelte";

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
    isDeviceDetectedMobile.set(mobileCheck());

    for (let imgFileNameSuffix of ["a", "b"]) {
      for (let imgName of BANK_IMAGES_NAMES) {
        const img = new Image();
        img.onload = () => {
          preloadedImages.push(img);
          console.info("image loaded : " + img.src);
        };
        img.src = `/study/${imgName}-${imgFileNameSuffix}.jpg`;
      }
    }
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

  function mobileCheck() {
    let check = false;
    (function (a) {
      if (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
          a
        ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
          a.substr(0, 4)
        )
      )
        check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
  }

  let input_viewportDiagonal: string = $state("");
  let input_viewportDiagonalUnit: MeasurementUnit = $state("cm");
  let input_screenEyeDistance: string = $state("");
  let input_screenEyeDistanceUnit: MeasurementUnit = $state("cm");
  const INCHES_IN_METER = 39.3700787402;
  const userSessionData = $derived({
    viewportDiagonalInMeters:
      input_viewportDiagonalUnit === "cm"
        ? silentFailParseFloat(input_viewportDiagonal) / 100
        : silentFailParseFloat(input_viewportDiagonal) / INCHES_IN_METER,
    viewDistanceInMeters:
      input_screenEyeDistanceUnit === "cm"
        ? silentFailParseFloat(input_screenEyeDistance) / 100
        : silentFailParseFloat(input_screenEyeDistance) / INCHES_IN_METER,
    isMobileDeviceDetected: $isDeviceDetectedMobile,
  });

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

    pushData();
  }

  let nAttemptedServerUpdates = 0;
  async function pushData() {
    const payload = {
      identifier: participantUUID,
      performance: imageTasksData,
      environment: userSessionData,
      nthShipment: nAttemptedServerUpdates,
    };
    console.log(payload);
    nAttemptedServerUpdates++;
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
  }

  let participantUUID: string = $derived(data.participantUUID);
  let preloadedImages: Array<HTMLImageElement> = $state([]);

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

{#if participantUUID.length && preloadedImages.length >= BANK_IMAGES_NAMES.length}
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
        <ViewingQuestions
          onNext={() => {
            onNext();
            pushData();
          }}
          {vwprtDiagAngleDeg}
          bind:input_screenEyeDistance
          bind:input_viewportDiagonal
          bind:input_screenEyeDistanceUnit
          bind:input_viewportDiagonalUnit
        ></ViewingQuestions>
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
        <Outro {participantUUID} />
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
        onPassImmediate={recordImageTaskPerformance}
        onPassAfterDelay={() => {
          isViewerEnabled = false;
          if (doesTaskCompletionAdvanceSections) {
            onNext(false);
          }
          indexCurrentImage++;
        }}
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
