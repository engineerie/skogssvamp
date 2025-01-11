<template>
  <!-- Renders the container only on client -->
  <div
    v-if="isClient"
    :id="viewerId"
    class="openseadragon-viewer pointer-events-none"
    ref="viewerContainer"
  ></div>
</template>

<script>
import {
  ref,
  computed,
  watch,
  onMounted,
  onBeforeUnmount,
  onActivated,
} from "vue";
import { useRoute } from "vue-router";

export default {
  name: "OpenSeadragonViewer",
  props: {
    dziUrl: { type: String, required: true },
  },
  setup(props, { emit }) {
    const route = useRoute(); // We watch route.name
    const viewer = ref(null); // The OSD instance
    const isClient = ref(false);
    const viewerContainer = ref(null); // Our container div ref

    // Unique ID if needed, though we mainly rely on viewerContainer ref
    const viewerId = computed(
      () => "openseadragon-viewer-" + Math.random().toString(36).substr(2, 9)
    );

    // The actual initialization logic
    async function initViewer() {
      // SSR guard
      if (typeof window === "undefined") return;

      // If we already created the viewer, skip
      if (viewer.value) {
        console.log("[OSD] Viewer already created, skipping init.");
        return;
      }

      // Confirm route is "skogsbruk-modell"
      if (route.name !== "skogsbruk-modell") {
        console.log("[OSD] Not on modell page, skipping initViewer().");
        return;
      }

      // Confirm we have a container in the DOM
      const containerEl = viewerContainer.value;
      if (!containerEl) {
        console.warn("[OSD] containerEl is null, skipping initViewer().");
        return;
      }

      // Dynamically import OpenSeadragon
      const { default: OpenSeadragon } = await import("openseadragon");

      // Create the viewer
      viewer.value = OpenSeadragon({
        element: containerEl, // Use the actual element, not an 'id'
        tileSources: props.dziUrl,
        showNavigationControl: false,
        visibilityRatio: 1,
        minZoomLevel: 1,
        constrainDuringPan: true,
        panHorizontal: false,
        panVertical: false,
        gestureSettingsMouse: {
          scrollToZoom: false,
          clickToZoom: false,
          dblClickToZoom: false,
          clickTodrag: false,
          pinchToZoom: false,
        },
      });

      viewer.value.addHandler("open", () => {
        console.log("[OSD] 'open' event fired for", props.dziUrl);
        emit("opened");
      });

      console.log("[OSD] Viewer CREATED with dziUrl:", props.dziUrl);
    }

    // Called whenever we want to re-open the tile
    function reOpenTile() {
      if (viewer.value && route.name === "skogsbruk-modell") {
        console.log("[OSD] Re-opening tile:", props.dziUrl);
        viewer.value.open(props.dziUrl);
      }
    }

    // Cleanup
    onBeforeUnmount(() => {
      if (viewer.value) {
        viewer.value.destroy();
        viewer.value = null;
      }
    });

    // If keep-alive is in play, re-open if returning to this route
    onActivated(() => {
      reOpenTile();
    });

    // If dziUrl changes while we're on the correct route, re-open
    watch(
      () => props.dziUrl,
      (newVal) => {
        if (newVal && route.name === "skogsbruk-modell") {
          reOpenTile();
        }
      }
    );

    // -------------
    // KEY PART: watch route.name + viewerContainer => init if everything's ready
    // -------------
    let alreadyWatching = false;

    onMounted(() => {
      if (typeof window === "undefined") return;
      isClient.value = true;

      // We do a combined watch to run initViewer() whenever
      // route.name or viewerContainer changes:
      if (!alreadyWatching) {
        alreadyWatching = true;
        watch(
          [() => route.name, () => viewerContainer.value],
          ([rName, cEl]) => {
            if (rName === "skogsbruk-modell" && cEl && !viewer.value) {
              console.log("[OSD] route name + container => initViewer!");
              initViewer();
            }
          },
          { immediate: true }
        );
      }
    });

    return {
      viewer,
      isClient,
      viewerContainer,
      viewerId,
    };
  },
};
</script>

<style scoped>
.openseadragon-viewer {
  width: 100%;
  height: 100%;
}
</style>
