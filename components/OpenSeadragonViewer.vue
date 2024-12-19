<template>
  <div :id="viewerId" class="openseadragon-viewer pointer-events-none"></div>
</template>

<script>
import OpenSeadragon from "openseadragon";

export default {
  name: "OpenSeadragonViewer",
  props: {
    dziUrl: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      viewer: null,
    };
  },
  computed: {
    viewerId() {
      return "openseadragon-viewer-" + Math.random().toString(36).substr(2, 9);
    },
  },
  beforeUnmount() {
    if (this.viewer) {
      this.viewer.destroy();
      this.viewer = null;
    }
  },
  mounted() {
    console.log("[OpenSeadragonViewer] mounted with dziUrl:", this.dziUrl);

    this.viewer = OpenSeadragon({
      id: this.viewerId,
      tileSources: this.dziUrl,
      showNavigationControl: false,
      visibilityRatio: 1,
      minZoomLevel: 1,
      constrainDuringPan: true,
      panHorizontal: false,
      panVertical: false,
      gestureSettingsMouse: {
        scrollToZoom: false,
        clickToZoom: false, // disables zooming on click
        dblClickToZoom: false, // disables zooming on double-click
        clickTodrag: false, // disables panning/dragging with mouse
        pinchToZoom: false, // if touch events matter, disable pinch-to-zoom
      },
      preserveViewport: true,
    });

    this.viewer.addHandler("animation", () => {
      const currentZoom = this.getZoom();
      const center = this.viewer.viewport.getCenter();
      this.$emit("viewportChanged", { zoom: currentZoom, center });
    });

    this.viewer.addHandler("open", () => {
      console.log("[OpenSeadragonViewer] 'open' event fired for", this.dziUrl);
      this.$emit("opened");
    });
  },
  methods: {
    getViewerInstance() {
      return this.viewer;
    },
    getZoom() {
      return this.viewer ? this.viewer.viewport.getZoom() : 1;
    },
  },
};
</script>

<style scoped>
.openseadragon-viewer {
  width: 100%;
  height: 100%;
}
</style>
