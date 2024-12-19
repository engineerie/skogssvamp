<template>
  <div class="landing-section relative">
    <!-- <div>
      <NuxtImg
        v-for="(imagePath, index) in allImages"
        :key="index"
        :src="imagePath"
        height="300"
        width="450"
        format="webp"
      />
    </div> -->
    <Landing class="z-10" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRuntimeConfig } from "#app";

const config = useRuntimeConfig();
const allImages = ref(config.public.images || []);
</script>

<style scoped>
/* Your existing styles remain unchanged */
.landing-section {
  z-index: 0;
  position: relative;
  background: radial-gradient(
        35.36% 35.36% at 100% 25%,
        #0000 66%,
        #e5e5e5 68% 70%,
        #0000 72%
      )
      21px 21px / calc(2 * 21px) calc(2 * 21px),
    radial-gradient(
        35.36% 35.36% at 0 75%,
        #0000 66%,
        #e5e5e5 68% 70%,
        #0000 72%
      )
      21px 21px / calc(2 * 21px) calc(2 * 21px),
    radial-gradient(
        35.36% 35.36% at 100% 25%,
        #0000 66%,
        #e5e5e5 68% 70%,
        #0000 72%
      )
      0 0 / calc(2 * 21px) calc(2 * 21px),
    radial-gradient(
        35.36% 35.36% at 0 75%,
        #0000 66%,
        #e5e5e5 68% 70%,
        #0000 72%
      )
      0 0 / calc(2 * 21px) calc(2 * 21px),
    repeating-conic-gradient(#f5f5f5 0 25%, #0000 0 50%) 0 0 / calc(2 * 21px)
      calc(2 * 21px),
    radial-gradient(#0000 66%, #e5e5e5 68% 70%, #0000 72%) 0 calc(21px / 2) /
      21px 21px #f5f5f5;
}

.dark .landing-section {
  z-index: 0;
  background: radial-gradient(
        35.36% 35.36% at 100% 25%,
        #0000 66%,
        #404040 68% 70%,
        #0000 72%
      )
      21px 21px / calc(2 * 21px) calc(2 * 21px),
    radial-gradient(
        35.36% 35.36% at 0 75%,
        #0000 66%,
        #404040 68% 70%,
        #0000 72%
      )
      21px 21px / calc(2 * 21px) calc(2 * 21px),
    radial-gradient(
        35.36% 35.36% at 100% 25%,
        #0000 66%,
        #404040 68% 70%,
        #0000 72%
      )
      0 0 / calc(2 * 21px) calc(2 * 21px),
    radial-gradient(
        35.36% 35.36% at 0 75%,
        #0000 66%,
        #404040 68% 70%,
        #0000 72%
      )
      0 0 / calc(2 * 21px) calc(2 * 21px),
    repeating-conic-gradient(#171717 0 25%, #0000 0 50%) 0 0 / calc(2 * 21px)
      calc(2 * 21px),
    radial-gradient(#0000 66%, #404040 68% 70%, #0000 72%) 0 calc(21px / 2) /
      21px 21px #171717;
}
</style>
