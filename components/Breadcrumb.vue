<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const breadcrumbLinks = computed(() => {
  const pathArray = route.path.split("/").filter((p) => p);
  const links = [
    {
      label: "Svampskog",
      to: "/",
    },
  ];
  for (let i = 0; i < pathArray.length; i++) {
    let path = "/" + pathArray.slice(0, i + 1).join("/");
    let label = pathArray[i].replace(/-/g, " "); // Replace hyphens with spaces
    label = label.charAt(0).toUpperCase() + label.slice(1);

    // Truncate label if it's longer than 10 characters
    if (label.length > 30) {
      label = label.substring(0, 30) + "...";
    }

    links.push({
      label: label,
      to: path,
    });
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
      base: 'flex items-center gap-x-1.5 group font-normal min-w-0',
    }"
  />
</template>
