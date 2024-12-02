<template>
  <div :id="viewerId" class="openseadragon-viewer"></div>
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
  mounted() {
    OpenSeadragon({
      id: this.viewerId,
      tileSources: this.dziUrl,
      showNavigationControl: false, // Disable default navigation controls
    });
  },
  computed: {
    viewerId() {
      return "openseadragon-viewer-" + Math.random().toString(36).substr(2, 9);
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
