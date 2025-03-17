<template>
  <div
    v-if="isClient"
    :id="viewerId"
    class="openseadragon-viewer relative"
    ref="viewerContainer"
    :style="{ backgroundColor: backgroundColor }"
    @mousedown.capture="handleActivate"
    @mousemove="updateMousePosition"
  >
    <!-- Display viewport coordinates for marker placement -->
    <div
      class="absolute top-0 right-0 m-2 p-1 bg-black bg-opacity-50 text-white text-xs z-50"
    >
      X: {{ mousePos.x.toFixed(4) }}, Y: {{ mousePos.y.toFixed(4) }}
    </div>
  </div>
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
  createApp,
} from "vue";
import { useRoute } from "vue-router";
import AnnotationPopup from "./AnnotationPopup.vue";
import AnnotationMarker from "./AnnotationMarker.vue";
import { useSelectedAnnotationStore } from "~/stores/selectedAnnotationStore";

export default {
  name: "OpenSeadragonViewer",
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
      default: "#d4d4d4",
    },
    annotations: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, { emit, expose }) {
    const route = useRoute();
    const viewer = ref(null);
    const isClient = ref(false);
    const viewerContainer = ref(null);
    const viewerId = computed(
      () => "openseadragon-viewer-" + Math.random().toString(36).substr(2, 9)
    );
    let osdLib = null;
    const currentTile = ref(null);

    // Reactive variable for viewport coordinates (for marker placement)
    const mousePos = ref({ x: 0, y: 0 });
    function updateMousePosition(e) {
      if (!viewerContainer.value || !viewer.value || !osdLib) return;
      // Get container coordinates
      const rect = viewerContainer.value.getBoundingClientRect();
      const containerX = e.clientX - rect.left;
      const containerY = e.clientY - rect.top;
      // Convert container pixel coordinates to viewport coordinates
      const pixelPoint = new osdLib.Point(containerX, containerY);
      const viewportPoint = viewer.value.viewport.pointFromPixel(pixelPoint);
      mousePos.value.x = viewportPoint.x;
      mousePos.value.y = viewportPoint.y;
    }

    const selectedAnnotationStore = useSelectedAnnotationStore();

    // When the selected annotation changes, update the overlays.
    watch(
      () => selectedAnnotationStore.selectedAnnotation,
      () => {
        if (viewer.value) {
          updateOverlays();
        }
      }
    );

    // Create marker overlays.
    function updateOverlays() {
      if (!viewer.value || !osdLib) return;
      viewer.value.clearOverlays();
      props.annotations.forEach((annotation) => {
        // Only create marker overlays if a valid position exists.
        if (!annotation.position) return;

        const markerContainer = document.createElement("div");
        // Mount the AnnotationMarker component (which uses the store for its selected state)
        const markerApp = createApp(AnnotationMarker, { annotation });
        markerApp.mount(markerContainer);

        new osdLib.MouseTracker({
          element: markerContainer,
          clickHandler: () => {
            emit("annotationClicked", annotation);
          },
        });

        viewer.value.addOverlay({
          element: markerContainer,
          location: new osdLib.Point(
            annotation.position.x,
            annotation.position.y
          ),
          placement: "BOTTOM",
          checkResize: false,
        });
      });
    }

    // Method to show the popup overlay.
    function showPopup(annotation) {
      if (!viewer.value || !osdLib) return;
      const popupContainer = document.createElement("div");
      popupContainer.style.pointerEvents = "auto";
      const app = createApp(AnnotationPopup, { annotation });
      app.mount(popupContainer);
    }

    // Initialize the viewer.
    async function initViewer() {
      if (typeof window === "undefined") return;
      if (viewer.value) return;
      if (route.name !== "skogsskotsel-modell") return;
      const containerEl = viewerContainer.value;
      if (!containerEl) return;
      const { default: osd } = await import("openseadragon");
      osdLib = osd;
      viewer.value = osdLib({
        element: containerEl,
        showNavigationControl: false,
        visibilityRatio: 1,
        minZoomLevel: 1,
        constrainDuringPan: true,
        panHorizontal: true,
        panVertical: true,
        homeFillsViewer: true,
        animationTime: 0.5,
        gestureSettingsMouse: {
          scrollToZoom: true,
          clickToZoom: false,
          dblClickToZoom: true,
          clickTodrag: false,
          pinchToZoom: false,
        },
      });
      // Emit viewport changes (if needed for other features)
      viewer.value.addHandler("animation", () => {
        const zoom = viewer.value.viewport.getZoom();
        const center = viewer.value.viewport.getCenter();
        emit("viewportChanged", { zoom, center });
      });
      transitionToNewTile(props.dziUrl);
    }

    function transitionToNewTile(newUrl) {
      if (!viewer.value) return;
      viewer.value.addTiledImage({
        tileSource: newUrl,
        success: function (newTiledImage) {
          if (currentTile.value) {
            viewer.value.world.removeItem(currentTile.value);
          }
          currentTile.value = newTiledImage;
          emit("opened");
          updateOverlays();
        },
      });
    }

    // Watch for changes in dziUrl.
    watch(
      () => props.dziUrl,
      (newVal, oldVal) => {
        if (viewer.value && newVal !== oldVal) {
          transitionToNewTile(newVal);
        }
      }
    );

    // Watch for changes in annotations.
    watch(
      () => props.annotations,
      () => {
        updateOverlays();
      },
      { immediate: true }
    );

    onBeforeUnmount(() => {
      if (viewer.value) {
        viewer.value.destroy();
        viewer.value = null;
      }
    });
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

    // -----------------------
    // Methods for zoom control.
    function zoomIn(factor = 1.2) {
      if (!viewer.value) return;
      const currentZoom = viewer.value.viewport.getZoom();
      const newZoom = currentZoom * factor;
      viewer.value.viewport.zoomTo(newZoom);
      viewer.value.viewport.applyConstraints();
      viewer.value.forceRedraw();
      return newZoom;
    }

    function zoomOut(factor = 1.2) {
      if (!viewer.value) return;
      const currentZoom = viewer.value.viewport.getZoom();
      const newZoom = currentZoom / factor;
      viewer.value.viewport.zoomTo(newZoom);
      viewer.value.viewport.applyConstraints();
      viewer.value.forceRedraw();
      return newZoom;
    }

    function getZoom() {
      return viewer.value ? viewer.value.viewport.getZoom() : null;
    }

    function getCenter() {
      return viewer.value ? viewer.value.viewport.getCenter() : null;
    }

    function setZoomAndCenter(zoom, center) {
      if (!viewer.value) return;
      viewer.value.viewport.zoomTo(zoom);
      // Animate the pan smoothly.
      viewer.value.viewport.panTo(center);
      viewer.value.viewport.applyConstraints();
      viewer.value.forceRedraw();
    }

    // Expose a method to attach event handlers (for syncing).
    function addSyncHandler(eventType, handler) {
      if (viewer.value) {
        viewer.value.addHandler(eventType, handler);
      }
    }

    // Emit an activation event.
    function handleActivate() {
      emit("activated", viewerId.value);
    }

    // Expose the necessary methods.
    expose({
      showPopup,
      zoomIn,
      zoomOut,
      getZoom,
      getCenter,
      setZoomAndCenter,
      addSyncHandler,
    });

    return {
      isClient,
      viewerContainer,
      viewerId,
      mousePos,
      updateMousePosition,
    };
  },
};
</script>

<style scoped>
.openseadragon-viewer {
  width: 100%;
  height: 100%;
  background: #d50000;
}
</style>
