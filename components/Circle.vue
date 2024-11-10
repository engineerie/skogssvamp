<template>
  <div
    class="circle w-6 h-6 hover:w-8 hover:h-8 transition-all bg-green-500 rounded-full cursor-pointer border-white border-2"
    @click="toggleInfoBox"
    :style="circleStyle"
    ref="circleRef"
  >
    <!-- Info Box -->
    <Transition name="fade">
      <div
        v-if="showInfoBox"
        class="info-box absolute"
        :style="infoBoxStyle"
        ref="infoBoxRef"
      >
        <div
          class="bg-white border border-gray-300 rounded-lg shadow-md w-80 overflow-hidden"
        >
          <img
            :src="info.image"
            class="w-full border-b-[0.5px] border-neutral-300"
          />
          <div class="p-3">
            <h3 class="text-lg font-semibold">{{ info.title }}</h3>
            <p class="text-sm text-gray-700">{{ info.text }}</p>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from "vue";

export default {
  name: "Circle",
  props: {
    position: {
      type: Object,
      required: true,
      // Example: { top: '45%', left: '25%' }
    },
    info: {
      type: Object,
      required: true,
      // Example: { title: 'Title', text: 'Description', image: 'path/to/image' }
    },
    visible: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const showInfoBox = ref(false);

    // Refs to the circle and info box elements
    const circleRef = ref(null);
    const infoBoxRef = ref(null);

    const toggleInfoBox = () => {
      showInfoBox.value = !showInfoBox.value;
    };

    const circleStyle = {
      position: "absolute",
      top: props.position.top,
      left: props.position.left,
      transform: "translate(-50%, -50%)",
    };

    const infoBoxStyle = {
      top: "50%",
      left: "120%",
      transform: "translateY(-50%)",
    };

    const handleOutsideClick = (event) => {
      if (showInfoBox.value) {
        const circleEl = circleRef.value;
        const infoBoxEl = infoBoxRef.value;
        if (
          circleEl &&
          !circleEl.contains(event.target) &&
          infoBoxEl &&
          !infoBoxEl.contains(event.target)
        ) {
          showInfoBox.value = false;
        }
      }
    };

    onMounted(() => {
      document.addEventListener("click", handleOutsideClick);
    });

    onBeforeUnmount(() => {
      document.removeEventListener("click", handleOutsideClick);
    });

    return {
      showInfoBox,
      toggleInfoBox,
      circleStyle,
      infoBoxStyle,
      circleRef,
      infoBoxRef,
    };
  },
};
</script>
