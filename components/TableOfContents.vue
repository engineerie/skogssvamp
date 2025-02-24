<template>
  <div>
    <ul>
      <li v-for="item in items" :key="item.id" class="mb-1">
        <a
          @click.prevent="handleClick(item.id)"
          :class="{
            'font-bold text-primary': activeId === item.id,
            'text-neutral-600': activeId !== item.id,
          }"
          class="cursor-pointer block"
        >
          {{ item.text }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  // Offset in pixels to adjust the final scroll position.
  offset: {
    type: Number,
    default: 100,
  },
});

const activeId = ref("");

function onScroll() {
  // Use window.scrollY since we now use the full page scroll.
  const scrollTop = window.scrollY;
  let current = "";
  props.items.forEach((item) => {
    const el = document.getElementById(item.id);
    if (el) {
      // If the top of the window (plus offset) has passed the element,
      // mark this item as active.
      if (scrollTop + props.offset >= el.offsetTop) {
        current = item.id;
      }
    }
  });
  activeId.value = current;
}

function handleClick(id: string) {
  const el = document.getElementById(id);
  if (el) {
    const targetScroll = el.offsetTop - props.offset;
    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
    // Update the URL hash without triggering a page jump.
    history.replaceState(null, "", `#${id}`);
  }
}

onMounted(() => {
  window.addEventListener("scroll", onScroll);

  // On first load, if a hash is present in the URL, scroll to it.
  if (window.location.hash) {
    const id = window.location.hash.slice(1);
    const el = document.getElementById(id);
    if (el) {
      // Delay scrolling slightly to ensure layout is ready.
      setTimeout(() => {
        window.scrollTo({
          top: el.offsetTop - props.offset,
          behavior: "smooth",
        });
      }, 100);
    }
  }
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
});
</script>
