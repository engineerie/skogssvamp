<template>
  <!-- Redlisted Species Info Display -->
  <NuxtImg
    :src="species.imageUrl || '/images/default-redlisted.jpg'"
    class="rounded-xl mb-2"
  />
  <BaseHeading size="lg">{{ capitalize(species.Commonname) }}</BaseHeading>
  <BaseHeading weight="light" size="sm">{{
    species.Scientificname
  }}</BaseHeading>

  <div class="flex items-center space-x-2 mt-3">
    <NuxtImg
      :src="getIconPath(species['Svamp-grupp'])"
      class="w-5"
      alt="Svamp Icon"
    />
    <BaseHeading size="md" weight="light">
      {{ capitalize(species["Svamp-grupp"]) }}
    </BaseHeading>
  </div>

  <div
    v-if="species['Nyasvamp-boken'] === 'x'"
    class="flex items-center space-x-2 mt-3"
  >
    <Icon
      name="icon-park-solid:knife-fork"
      class="h-7 w-7 text-yellow-500 -my-2"
    />
    <BaseHeading size="md" weight="light"> Matsvamp </BaseHeading>
  </div>

  <!-- Display Signalart Badge if Available -->
  <div
    v-if="species.SIGNAL_art === 'S'"
    class="flex items-center space-x-2 mt-3"
  >
    <div
      class="h-8 w-8 rounded-full bg-neutral-500 opacity-100 flex items-center justify-center text-white z-10"
    >
      S
    </div>
    <BaseHeading size="md" weight="light"> Signalart </BaseHeading>
  </div>

  <!-- Display RL2020kat Status -->
  <div v-if="species.RL2020kat" class="flex items-center space-x-2 mt-3">
    <div
      :class="getStatusColor(species.RL2020kat)"
      class="h-8 w-8 rounded-full flex items-center justify-center text-white"
    >
      {{ getStatusAbbreviation(species.RL2020kat) }}
    </div>
    <BaseHeading size="md" weight="light">
      {{ getStatusTooltip(species.RL2020kat) }}
    </BaseHeading>
  </div>
  <div v-if="species.OVANLIGHET == 2" class="flex items-center space-x-2 mt-3">
    <Icon name="material-symbols:star-rounded" class="w-8 h-8 text-teal-500" />
    <BaseHeading size="md" weight="light"> Väldigt sällsynt </BaseHeading>
  </div>

  <!-- 'K' for Kalkmark -->
  <div v-if="species.KALKmark" class="flex items-center space-x-2 mt-3">
    <div
      class="h-8 w-8 rounded-full flex items-center justify-center text-white bg-stone-700"
      data-nui-tooltip-position="left"
      :data-nui-tooltip="'Kalkmark'"
    >
      K
    </div>
    <BaseHeading size="md" weight="light">Kalkmark</BaseHeading>
  </div>
  <!-- 'Ö' for Övrig mark -->
  <div v-if="species.ANNANmark" class="flex items-center space-x-2 mt-3">
    <div
      class="h-8 w-8 rounded-full flex items-center justify-center text-white bg-stone-400"
      data-nui-tooltip-position="left"
      :data-nui-tooltip="'Vanlig skogsmark'"
    >
      V
    </div>
    <BaseHeading size="md" weight="light"> Vanlig skogsmark </BaseHeading>
  </div>

  <hr class="my-2" />

  <div
    class="flex justify-between cursor-pointer"
    v-if="species.ekologi"
    @click="toggleExpandEkologi"
  >
    <BaseHeading size="lg" weight="medium"> Ekologi </BaseHeading>

    <Icon
      name="mdi:chevron-down"
      :class="[
        'h-6 w-6 transition-transform duration-300 ease-in-out',
        isExpandedEkologi ? 'rotate-180' : 'rotate-0',
      ]"
    />
  </div>

  <div
    class="relative overflow-hidden transition-transform duration-300 ease-in-out"
    :class="[isExpandedEkologi ? 'max-h-auto' : 'max-h-20']"
    v-if="species.ekologi"
    @click="toggleExpandEkologi"
  >
    <BaseHeading size="md" weight="light">
      {{ truncatedTextEkologi }}
    </BaseHeading>
  </div>

  <hr class="my-2" v-if="species.ekologi" />

  <!-- Kriteriedokumentation Section with Expand/Collapse -->
  <div
    class="flex justify-between cursor-pointer"
    v-if="species.Kriteriedokumentation"
    @click="toggleExpand"
  >
    <BaseHeading size="lg" weight="medium"> Kriteriedokumentation </BaseHeading>

    <Icon
      name="mdi:chevron-down"
      :class="[
        'h-6 w-6 transition-transform duration-300 ease-in-out',
        isExpanded ? 'rotate-180' : 'rotate-0',
      ]"
    />
  </div>

  <div
    class="relative overflow-hidden transition-transform duration-300 ease-in-out"
    :class="[isExpanded ? 'max-h-auto' : 'max-h-20']"
    v-if="species.Kriteriedokumentation"
    @click="toggleExpand"
  >
    <BaseHeading size="md" weight="light">
      {{ truncatedText }}
    </BaseHeading>
  </div>

  <hr class="my-2" v-if="species.Kriteriedokumentation" />

  <!-- Länkar Section -->
  <BaseHeading size="md" weight="medium"> Länkar </BaseHeading>

  <NuxtLink
    v-if="species.Artfakta != 'Information saknas'"
    :to="stripDetailsFromURL(species.Artfakta)"
    target="blank"
    class="text-md font-thin mb-3"
  >
    Artfakta.se
  </NuxtLink>
  <br />
  <NuxtLink
    v-if="species.Svampguiden"
    :to="stripDetailsFromURL(species.Svampguiden)"
    target="blank"
    class="text-md font-thin mb-3"
  >
    Svampguiden.se
  </NuxtLink>
</template>
<script setup>
import { ref, computed } from "vue";
import { defineProps } from "vue";

const props = defineProps({
  species: Object,
});

const isExpanded = ref(false);
const isExpandedEkologi = ref(false);
const charLimit = 50; // Character limit for truncation

// Toggle the expansion of the text
const toggleExpand = () => {
  isExpanded.value = !isExpanded.value;
};

// Toggle the expansion of the text
const toggleExpandEkologi = () => {
  isExpandedEkologi.value = !isExpandedEkologi.value;
};

// Computed property for showing truncated text if not expanded
const truncatedText = computed(() => {
  if (isExpanded.value) {
    return props.species.Kriteriedokumentation;
  }
  return props.species.Kriteriedokumentation.slice(0, charLimit) + "...";
});

// Computed property for showing truncated text if not expanded
const truncatedTextEkologi = computed(() => {
  if (isExpandedEkologi.value) {
    return props.species.ekologi;
  }
  return props.species.ekologi.slice(0, charLimit) + "...";
});

const capitalize = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const stripDetailsFromURL = (url) => {
  if (!url) return "";
  return url.replace("/detaljer", "");
};

const getStatusAbbreviation = (status) => {
  const abbreviations = {
    LC: "LC",
    NT: "NT",
    EN: "EN",
    VU: "VU",
    CR: "CR",
    RE: "RE",
    DD: "DD",
  };
  return abbreviations[status] || "NE";
};

const getStatusColor = (status) => {
  const colors = {
    LC: "bg-green-500",
    NT: "bg-[#D7838E]",
    EN: "bg-[#C4004F]",
    VU: "bg-[#D7838E]",
    CR: "bg-[#C4004F]",
    RE: "bg-[#421A31]",
    DD: "bg-[#E8E9E7]",
  };
  return colors[status] || "bg-[#EAB61F]";
};

const getStatusTooltip = (status) => {
  const tooltips = {
    LC: "Livskraftig",
    NT: "Nära hotad",
    EN: "Starkt hotad",
    VU: "Sårbar",
    CR: "Akut hotad",
    RE: "Nationellt utdöd",
    DD: "Kunskapsbrist",
  };
  return tooltips[status] || "Ej bedömd";
};

const getIconPath = (svampGrupp) => {
  const iconMapping = {
    övrigt: "BasilOther1Solid.png",
    hattsvamp: "hattsvamp.png",
    kantarell: "kantarell.webp",
    sopp: "sopp.png",
    taggsvamp: "taggsvamp.png",
    fingersvamp: "fingersvamp.webp",
    tryffel: "tryffel.webp",
    skinnsvamp: "skinnsvamp.webp",
    skålsvamp: "skalsvamp.webp",
  };

  return `/images/svampgrupp/${iconMapping[svampGrupp] || "default-icon.webp"}`;
};
</script>
