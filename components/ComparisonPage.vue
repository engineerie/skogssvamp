<!-- ComparisonPage.vue -->
<template>
  <div class="grid grid-cols-5 gap-4">
    <div v-for="env in environments" :key="env.query">
      <div class="gap-2 mb-4">
        <UBadge
          size="sm"
          shape="rounded"
          color="info"
          flavor="pastel"
          class="m-1"
          >{{ env.query.geography.split(" ")[0] }}</UBadge
        >
        <UBadge
          size="sm"
          shape="rounded"
          color="success"
          flavor="pastel"
          class="m-1"
          >{{ env.query.forestType }}</UBadge
        >
        <UBadge
          size="sm"
          shape="rounded"
          color="warning"
          flavor="pastel"
          class="m-1"
          >{{ env.query.vegetationType }}</UBadge
        >
        <UBadge
          size="sm"
          shape="rounded"
          color="danger"
          flavor="pastel"
          class="m-1"
          >{{ env.query.standAge.split(" ")[0] }}</UBadge
        >
      </div>

      <UCard shape="curved" class="p-6 mb-4">
        <h1
          as="h4"
          size="sm"
          weight="medium"
          lead="tight"
          class="mb-2 text-muted-400"
        >
          Environment Info:
        </h1>
        <p size="md" lead="tight" color="primary">
          {{ env.EnvironmentMessage }}
        </p>
      </UCard>

      <UCard shape="curved" class="p-6" color="primary">
        <h1 as="h4" size="sm" weight="medium" lead="tight" class="mb-2">
          Redlisted Species
        </h1>
        <h1 weight="semibold" size="4xl" lead="tight">
          {{ env.RedListedMessage }}
        </h1>
      </UCard>
    </div>
  </div>
</template>

<script setup>
import { useComparisonStore } from "~/stores/comparisonStore";
import { useTitleStore } from "~/stores/titleStore";
import { onMounted } from "vue";

const titleStore = useTitleStore();

onMounted(() => {
  titleStore.setTitle("Compare Environments");
});

const comparisonStore = useComparisonStore();
const environments = comparisonStore.environments;

console.log("Fetched environments: ", environments); // Debugging line
</script>
