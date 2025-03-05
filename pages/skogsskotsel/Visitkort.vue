<template>
  <div class="w-full flex justify-center pt-40">
    <div
      class="h-80 w-[500px] border border-neutral-200 space-y-1 space-x-1 p-4 bg-white"
    >
      <p class="text-sm text-gray-600 mt-2">
        Jag bygger webbaserade verktyg för forskning och datavisualisering, med
        fokus på skog och ekologi. Just nu utvecklar jag en webapp för att
        kartlägga svampar i skogsmiljöer.
      </p>

      <div class="flex flex-wrap gap-2 mt-4">
        <UBadge color="teal" variant="subtle" :ui="{ rounded: 'rounded-full' }">
          Webbutveckling
        </UBadge>
        <UBadge
          color="amber"
          variant="subtle"
          :ui="{ rounded: 'rounded-full' }"
        >
          Datavisualisering
        </UBadge>
        <UBadge
          color="violet"
          variant="subtle"
          :ui="{ rounded: 'rounded-full' }"
        >
          3D-modellering
        </UBadge>
        <UBadge
          color="green"
          variant="subtle"
          :ui="{ rounded: 'rounded-full' }"
        >
          Ekologiska data
        </UBadge>
        <UBadge color="blue" variant="subtle" :ui="{ rounded: 'rounded-full' }">
          Vetenskapskommunikation
        </UBadge>
        <UBadge color="rose" variant="subtle" :ui="{ rounded: 'rounded-full' }">
          Research-driven Design
        </UBadge>
      </div>
    </div>
  </div>
</template>
