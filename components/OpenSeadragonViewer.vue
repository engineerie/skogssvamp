<template>
  <div
    v-if="isClient"
    :id="viewerId"
    class="openseadragon-viewer pointer-events-none"
    ref="viewerContainer"
    :style="{ backgroundColor: backgroundColor }"
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
  nextTick,
} from "vue";
import { useRoute } from "vue-router";

export default {
  name: "OpenSeaDragonViewer",
  props: {
    dziUrl: {
      type: String,
      required: true,
    },
    allowPan: {
      type: Boolean,
      default: true,
    },
    backgroundColor: {
      type: String,
      default: "#fff",
    },
  },
  setup(props, { emit }) {
    const route = useRoute();
    const viewer = ref(null);
    const isClient = ref(false);
    const viewerContainer = ref(null);
    const viewerId = computed(
      () => "openseadragon-viewer-" + Math.random().toString(36).substr(2, 9)
    );

    // Keep track of the currently displayed tiled image.
    const currentTile = ref(null);

    async function initViewer() {
      if (typeof window === "undefined") return;
      if (viewer.value) {
        console.log("[OSD] Viewer already created, skipping init.");
        return;
      }
      // Optionally, only initialize on your modell page.
      if (route.name !== "skogsbruk-modell") {
        console.log("[OSD] Not on modell page, skipping initViewer().");
        return;
      }
      const containerEl = viewerContainer.value;
      if (!containerEl) {
        console.warn("[OSD] containerEl is null, skipping initViewer().");
        return;
      }
      // Dynamically import OpenSeadragon.
      const { default: OpenSeadragon } = await import("openseadragon");
      viewer.value = OpenSeadragon({
        element: containerEl,
        showNavigationControl: false,
        visibilityRatio: 1,
        minZoomLevel: 1,
        constrainDuringPan: true,
        panHorizontal: props.allowPan,
        panVertical: props.allowPan,
        homeFillsViewer: true, // <-- add this option
        gestureSettingsMouse: {
          scrollToZoom: props.allowPan,
          clickToZoom: false,
          dblClickToZoom: props.allowPan,
          clickTodrag: false,
          pinchToZoom: false,
        },
      });
      console.log("[OSD] Viewer CREATED");
      // Load the first image using our transition function.
      transitionToNewTile(props.dziUrl);
    }

    function transitionToNewTile(newUrl) {
      if (!viewer.value) return;

      viewer.value.addTiledImage({
        tileSource: newUrl,
        // <-- this option tells OSD to keep the current viewport
        success: function (newTiledImage) {
          console.log("[OSD] New tiled image added for", newUrl);
          // Remove the previous image immediately, if any.
          if (currentTile.value) {
            viewer.value.world.removeItem(currentTile.value);
          }
          currentTile.value = newTiledImage;
          emit("opened");
        },
      });
    }
    // Watch for changes in the dziUrl prop and trigger a transition.
    watch(
      () => props.dziUrl,
      (newVal, oldVal) => {
        if (viewer.value && newVal !== oldVal) {
          console.log("[OSD] Transitioning to new dziUrl:", newVal);
          transitionToNewTile(newVal);
        }
      }
    );

    // Cleanup the viewer when the component is unmounted.
    onBeforeUnmount(() => {
      if (viewer.value) {
        viewer.value.destroy();
        viewer.value = null;
      }
    });

    // For keep-alive scenarios: re-trigger transition if necessary.
    onActivated(() => {
      if (props.dziUrl && viewer.value) {
        transitionToNewTile(props.dziUrl);
      }
    });

    onMounted(() => {
      if (typeof window === "undefined") return;
      isClient.value = true;
      nextTick(() => {
        initViewer();
      });
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
  background: #fff;
}
</style>
