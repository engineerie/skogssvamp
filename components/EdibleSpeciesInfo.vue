<template>
  <div class="w-full pt-16">
    <!-- Top heading bar -->
    <div class="absolute top-0 w-full z-50 bg-white flex justify-between">
      <BaseHeading size="3xl" weight="thin" lead="snug" class="pt-3 pb-2 px-6">
        {{ capitalize(species.Commonname) }}
      </BaseHeading>
    </div>

    <!-- Images Section -->
    <div
      v-if="imageUrls.length > 1"
      class="group mx-4 mb-0 rounded-md overflow-hidden z-40"
    >
      <UCarousel
        v-slot="{ item }"
        :items="imageUrls"
        :ui="{ item: 'basis-full' }"
        :prev-button="{
          color: 'gray',
          class:
            'invisible group-hover:visible scale-0 group-hover:scale-100 transition-transform',
        }"
        :next-button="{
          color: 'gray',
          class:
            'invisible group-hover:visible scale-0 group-hover:scale-100 transition-transform',
        }"
        arrows
      >
        <div class="w-full">
          <NuxtImg
            :src="item"
            class="w-full rounded-md border border-neutral-300"
            draggable="false"
            height="300"
            width="450"
            format="webp"
          />
          <div
            class="flex bg-white w-full justify-end px-2 py-1 items-center rounded-b"
          >
            <BaseHeading weight="light" size="sm" class="text-neutral-700"
              >Foto:</BaseHeading
            >
            <Icon name="ph:copyright" class="h-4 w-4 mx-1" />
            <BaseHeading weight="light" size="sm" class="text-neutral-700"
              >Michael Krikorev</BaseHeading
            >
          </div>
        </div>
      </UCarousel>
    </div>
    <div
      v-else-if="imageUrls.length === 1"
      class="mx-4 mb-0 rounded-md overflow-hidden z-40"
    >
      <NuxtImg
        :src="imageUrls[0]"
        class="w-full rounded-md border border-neutral-300"
        draggable="false"
        height="300"
        width="450"
        format="webp"
      />
      <div
        class="flex bg-white w-full justify-end px-2 py-1 items-center rounded-b"
      >
        <BaseHeading weight="light" size="sm" class="text-neutral-700"
          >Foto:</BaseHeading
        >
        <Icon name="ph:copyright" class="h-4 w-4 mx-1" />
        <BaseHeading weight="light" size="sm" class="text-neutral-700"
          >Michael Krikorev</BaseHeading
        >
      </div>
    </div>
    <div v-else>
      <!-- No images found: Show placeholder like EdnaSpeciesInfo -->
      <div
        class="mx-4 relative pb-[56.25%] bg-transparent border border-neutral-300 rounded-md cursor-pointer"
        style="
          background-image: repeating-linear-gradient(
            -45deg,
            rgba(0, 0, 0, 0.1) 0px,
            rgba(0, 0, 0, 0.1) 5px,
            transparent 5px,
            transparent 10px
          );
        "
      ></div>
    </div>

    <!-- Content Section -->
    <div class="px-6 pb-3">
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

      <div
        v-if="species.Giftsvamp === 'x'"
        class="flex items-center space-x-2 mt-3"
      >
        <Icon name="hugeicons:danger" class="h-7 w-7 text-lime-500 -my-2" />
        <BaseHeading size="md" weight="light"> Giftsvamp </BaseHeading>
      </div>

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
      <!-- <div
        v-if="species.OVANLIGHET == 2"
        class="flex items-center space-x-2 mt-3"
      >
        <Icon
          name="material-symbols:star-rounded"
          class="w-8 h-8 text-teal-500"
        />
        <BaseHeading size="md" weight="light"> Väldigt sällsynt </BaseHeading>
      </div> -->
      <div class="flex items-center space-x-2 mt-3">
        <div v-if="species.KALKmark">
          <UBadge
            :ui="{ rounded: 'rounded-full' }"
            color="amber"
            variant="outline"
            >Kalkmark</UBadge
          >
        </div>
        <div v-if="species.ANNANmark">
          <UBadge
            :ui="{ rounded: 'rounded-full' }"
            color="emerald"
            variant="outline"
            >Vanlig skogsmark</UBadge
          >
        </div>
      </div>

      <hr
        class="my-2"
        v-if="species.ekologi || species.Kriteriedokumentation"
      />

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

      <div
        class="flex justify-between cursor-pointer"
        v-if="species.Kriteriedokumentation"
        @click="toggleExpand"
      >
        <BaseHeading size="lg" weight="medium">
          Dokumentation i rödlistan
        </BaseHeading>
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

      <BaseHeading size="md" weight="medium"> Länkar </BaseHeading>

      <NuxtLink
        v-if="species.Artfakta != 'Information saknas'"
        :to="stripDetailsFromURL(species.Artfakta)"
        target="_blank"
        class="text-md font-thin mb-3 underline text-primary-500"
      >
        Artfakta.se
      </NuxtLink>
      <br />
      <NuxtLink
        v-if="species.Svampguiden"
        :to="stripDetailsFromURL(species.Svampguiden)"
        target="_blank"
        class="text-md font-thin mb-3 underline text-primary-500"
      >
        Svampguiden.com
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";

const props = defineProps({
  species: Object,
});

const searchFolders = ["Matsvampar", "Giftsvampar"];
const imageUrls = ref([]);

const isExpanded = ref(false);
const isExpandedEkologi = ref(false);
const charLimit = 50;

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value;
};

const toggleExpandEkologi = () => {
  isExpandedEkologi.value = !isExpandedEkologi.value;
};

const truncatedText = computed(() => {
  if (!props.species.Kriteriedokumentation) return "";
  return isExpanded.value
    ? props.species.Kriteriedokumentation
    : props.species.Kriteriedokumentation.slice(0, charLimit) + "...";
});

const truncatedTextEkologi = computed(() => {
  if (!props.species.ekologi) return "";
  return isExpandedEkologi.value
    ? props.species.ekologi
    : props.species.ekologi.slice(0, charLimit) + "...";
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
  return colors[status] || "bg-neutral-300";
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

const speciesName = computed(() => props.species.Scientificname || "");

const fetchImages = async () => {
  if (!speciesName.value) {
    imageUrls.value = [];
    return;
  }

  try {
    const manifest = await $fetch("/imagemanifest/manifest.json");
    const foundImages = [];

    // Clean the species name:
    const cleanedSpeciesName = speciesName.value
      .replace(/\s*s\.?\s*(lat\.?|str\.?)\s*$/i, "")
      .normalize("NFD") // decompose accented chars
      .replace(/[\u0300-\u036f]/g, "") // remove diacritics
      .toLowerCase()
      .trim();

    const matchesName = (filename, nameToMatch) => {
      const base = filename.replace(/\.(jpg|jpeg|png|webp)$/i, "");
      const [namePart] = base.split("-", 1);

      const cleanedNamePart = namePart
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();

      if (cleanedNamePart.includes(",")) {
        const [nameA, nameB] = cleanedNamePart.split(",").map((s) => s.trim());
        return nameA === nameToMatch || nameB === nameToMatch;
      }

      return cleanedNamePart === nameToMatch;
    };

    for (const folder of searchFolders) {
      const files = manifest[folder] || [];
      for (const file of files) {
        if (matchesName(file, cleanedSpeciesName)) {
          const imagePath = `/images/SvampBilder/${folder}/${file}`;
          foundImages.push(imagePath);
        }
      }
    }

    imageUrls.value = foundImages;
  } catch (error) {
    console.error("Error fetching manifest.json:", error);
    imageUrls.value = [];
  }
};

onMounted(() => {
  fetchImages();
});

watch(
  () => props.species,
  () => {
    fetchImages();
  }
);
</script>
