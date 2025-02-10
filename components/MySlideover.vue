<!-- MySlideover.vue -->
<template>
  <!-- Slide-in from right transition -->
  <transition name="slide-in-right">
    <!-- If modelValue is true, show the slideover wrapper -->
    <div
      v-if="modelValue"
      class="fixed inset-0 z-50 flex pointer-events-none m-2"
    >
      <!-- Overlay if pinned = false -->
      <div
        v-if="!localPinned"
        class="fixed inset-0 pointer-events-auto"
        @click="emit('update:modelValue', false)"
      ></div>

      <!-- The slideover panel sits on the right side (ml-auto) -->
      <div
        ref="panelRef"
        class="ml-auto w-96 bg-white shadow-lg z-50 relative pointer-events-auto rounded-xl ring-1 ring-neutral-200 transition-all"
        :class="localPinned ? ' -m-1' : ''"
        @click.stop
      >
        <header class="border-b p-2 flex justify-end items-center gap-2">
          <!-- Pin / Unpin button -->
          <Icon
            @click="togglePinned"
            name="codicon:pinned"
            class="h-7 w-7 hover:cursor-pointer transition-all"
            :class="
              localPinned
                ? 'text-primary-500 transition-all'
                : 'text-neutral-700 -mt-2 transition-all'
            "
          />

          <!-- Close button -->

          <BaseButtonIcon
            shape="full"
            @click="emit('update:modelValue', false)"
          >
            <Icon name="heroicons:chevron-right" class="size-5" />
          </BaseButtonIcon>
        </header>

        <!-- Default slot for content -->
        <div class="overflow-auto h-full relative">
          <slot />
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  /**
   * Open/closed state
   */
  modelValue: {
    type: Boolean,
    default: false,
  },
  /**
   * Pinned state => determines if overlay is shown
   */
  pinned: {
    type: Boolean,
    default: true,
  },
});
const emit = defineEmits(["update:modelValue", "update:pinned"]);

/**
 * localPinned mirrors the parent's pinned prop
 */
const localPinned = ref(props.pinned);

watch(
  () => props.pinned,
  (val) => {
    localPinned.value = val;
  }
);

/**
 * Toggle pinned <-> unpinned
 */
function togglePinned() {
  localPinned.value = !localPinned.value;
  // Let the parent know pinned changed
  emit("update:pinned", localPinned.value);
}
</script>

<style scoped>
/* Simple transition for sliding in from the right */
.slide-in-right-enter-active,
.slide-in-right-leave-active {
  transition: transform 0.5s ease;
}
.slide-in-right-enter-from,
.slide-in-right-leave-to {
  transform: translateX(100%);
}
</style>
