<!-- LandingPage.vue -->
<template>
  <div>
    <!-- Other sections -->
    <!-- Species List Section -->
    <div class="py-16">
      <div class="container mx-auto px-6 text-center">
        <h2 class="text-3xl font-bold mb-4">Utforska Svamparter</h2>
        <p class="text-lg mb-8">
          Definiera din skogsmiljö och upptäck vilka svampar som finns där.
        </p>
        <!-- Include the ListBoxRowLanding component -->
        <LandingListBoxRowLanding
          @selections-changed="handleSelectionsChanged"
        />
        <!-- Include the FullScreenEdnaLanding component -->
        <LandingFullScreenEdnaLanding :selections="selections" />
      </div>
    </div>
    <!-- Other sections -->
  </div>
</template>

<script setup>
import { ref } from "vue";
import LandingListBoxRowLanding from "~/components/Landing/ListBoxRowLanding.vue";
import LandningFullScreenEdnaLanding from "~/components/Landing/FullScreenEdnaLanding.vue";

const selections = ref({});

function handleSelectionsChanged(newSelections) {
  selections.value = newSelections;
}
</script>
