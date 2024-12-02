<template>
  <div class="landing-section relative">
    <transition-group
      name="fade"
      tag="div"
      class="mushroom-container pointer-events-none -z-10"
    >
      <!-- <Icon
        v-for="(mushroom, index) in mushrooms"
        :key="mushroom.id"
        :style="{
          top: mushroom.y + 'px',
          left: mushroom.x + 'px',
          transform: mushroom.scale,
        }"
        name="hugeicons:mushroom"
        class="size-5 text-green-500 mushroom -z-10"
      /> -->
    </transition-group>
    <!-- <DynamicDivsLanding /> -->
    <Landing clas="z-10" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      mushrooms: [],
    };
  },
  mounted() {
    this.startMushroomAnimation();
  },
  methods: {
    startMushroomAnimation() {
      setInterval(() => {
        const id = Date.now();
        const newMushroom = {
          id,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          scale: `scale(${Math.random() * 0.5 + 0.75})`,
        };
        this.mushrooms.push(newMushroom);

        setTimeout(() => {
          this.mushrooms = this.mushrooms.filter((m) => m.id !== id);
        }, 3000); // Mushroom disappears after 3 seconds
      }, 1000); // A new mushroom appears every second
    },
  },
};
</script>

<style scoped>
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

.mushroom-container {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1; /* Ensure this is behind the content */
}

.mushroom {
  position: absolute;
  transition: opacity 1s, transform 1s;
  z-index: -1; /* Ensure they appear on top */
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
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
