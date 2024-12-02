<template>
  <div class="mx-auto max-w-5xl grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
    <!-- Option Cards -->
    <OptionCard
      v-for="option in options"
      :key="option.id"
      :title="option.title"
      :description="option.description"
      :icon="option.icon"
      :iconColor="option.iconColor"
    />
  </div>
</template>

<script setup>
import OptionCard from "~/OptionCard.vue";

const options = [
  {
    id: 1,
    title: "Inga åtgärder",
    description: "Vad som händer när du väljer att inte avverka skogen.",
    icon: "pepicons-pop:tree-circle",
    iconColor: "text-green-400",
  },
  {
    id: 2,
    title: "Trakthygge",
    description: "Trakthyggesbruk med hänsynsträd och högstubbar.",
    icon: "material-symbols:resize",
    iconColor: "text-violet-400",
  },
  {
    id: 3,
    title: "Luckhuggning",
    description: "Luckors storlek, kanteffekt och avverkningsomlopp.",
    icon: "pixelarticons:chess",
    iconColor: "text-sky-400",
  },
  {
    id: 4,
    title: "Skärmträd",
    description: "Förberedande gallring, skärmställning och avverkning.",
    icon: "catppuccin:redwood",
    iconColor: "text-orange-400",
  },
  {
    id: 5,
    title: "Blädning",
    description: "Blädningsbruk, ger också bild av enstaka gallring.",
    icon: "tabler:christmas-tree-off",
    iconColor: "text-teal-400",
  },
];
</script>
