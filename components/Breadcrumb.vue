<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const breadcrumbLinks = computed(() => {
  if (route.path.startsWith("/mykorrhizasvampar/")) {
    return [
      { label: "Svampskog", to: "/" },
      { label: "Mykorrhizasvampar", to: "/mykorrhizasvampar" },
      { label: "Miljö", to: route.path },
    ];
  }

  // Otherwise, build breadcrumbs as usual:
  const pathArray = route.path.split("/").filter((p) => p);
  const links = [{ label: "Svampskog", to: "/" }];
  for (let i = 0; i < pathArray.length; i++) {
    const path = "/" + pathArray.slice(0, i + 1).join("/");
    const segment = pathArray[i];
    // Decode the segment to get proper characters
    const decodedSegment = decodeURIComponent(segment);
    let label = decodedSegment.replace(/-/g, " ");
    label = label.charAt(0).toUpperCase() + label.slice(1);

    // Fix the specific label if it matches "skogsskotsel"
    if (label.toLowerCase() === "skogsskotsel") {
      label = "Skogsskötsel";
    }

    // Truncate label if it's longer than 30 characters
    if (label.length > 30) {
      label = label.substring(0, 30) + "...";
    }

    links.push({ label, to: path });
  }
  return links;
});
</script>

<template>
  <UBreadcrumb
    :links="breadcrumbLinks"
    divider="/"
    :ui="{
      li: 'flex items-center gap-x-1.5 text-neutral-500 dark:text-neutral-400 text-md leading-6 min-w-0',
      inactive: 'hover:text-neutral-700 dark:hover:text-neutral-200',
      base: 'flex items-center gap-x-1.5 group font-normal min-w-0',
    }"
  />
</template>
