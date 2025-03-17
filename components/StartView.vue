<template>
  <div>
    <hr class="mb-4" />
    <div class="grid grid-cols-12 gap-4">
      <!-- Left side remains unchanged -->
      <div
        class="col-span-3 border border-neutral-200 rounded-2xl bg-neutral-50 bg-opacity-95 overflow-hidden flex-col justify-between h-fit"
      >
        <div class="p-6">
          <h1 class="text-neutral-500 text-lg">
            Här kan du söka på svenska skogsmiljöer för att se vilka arter som
            kan finnas i marken baserat på DNA-analyser av svampmycel i
            jordprover samt vår samlade kunskap om var olika arters fruktkroppar
            förekommer.
          </h1>
        </div>
        <div class="w-full">
          <img src="/images/SvamparSverige4.svg" class="z-10" />
        </div>
      </div>

      <!-- Right side with tabs -->
      <div class="col-span-9">
        <UTabs
          v-model="selectedIndex"
          :items="items"
          class="w-fit"
          :ui="{
            list: {
              rounded: 'rounded-full',
              marker: {
                rounded: 'rounded-full',
              },
            },
          }"
        />

        <!-- Kom igång Tab -->
        <div
          v-if="activeTab === 'komigang'"
          class="border rounded-2xl p-6 border-neutral-200 bg-neutral-50"
        >
          <!-- <h1 size="xl" weight="light">Instruktioner</h1> -->
          <div class="text-neutral-500 text-md">
            <ul class="space-y-4">
              <li class="">
                Välj skogsmiljö genom att ange

                <Icon
                  name="material-symbols:location-on-outline"
                  class="size-5 text-fuchsia-500 -mb-1"
                />
                Var i Sverige (för närvarande begränsat till norr och söder),

                <Icon name="lucide:trees" class="size-5 text-green-500 -mb-1" />
                Skogstyp (vilka träd som dominerar),

                <Icon
                  name="carbon:crop-growth"
                  class="size-5 text-violet-500 -mb-1"
                />
                Beståndsålder (trädens ålder) och

                <Icon
                  name="fluent-emoji-high-contrast:herb"
                  class="size-5 text-teal-500 -mb-1"
                />
                Fältskikt (vilken vegetation som växer på marken).
              </li>
              <li>
                Klicka på respektive kategori för att göra dina val, eller
                använd knappen
                <div
                  class="inline-flex mx-1 items-center rounded-full ring-1 ring-neutral-200 w-fit text-sm py-1 pl-4 pr-3 gap-1 bg-neutral-50 text-neutral-950"
                >
                  <span>Visa kombinationsvy</span>
                  <Icon name="mdi:chevron-down" class="size-5" />
                </div>
                för att se alla alternativ som radioknappar.
                <UAlert
                  class="my-2"
                  icon="i-heroicons-information-circle"
                  color="amber"
                  variant="subtle"
                  title="Det är nödvändigt att göra val i alla kategorier."
                />
              </li>
              <li class="pt-4">
                Du kan också klicka på
                <div
                  class="inline-flex mx-1 items-center rounded-full ring-1 ring-neutral-200 w-fit text-sm py-1 pl-4 pr-3 gap-1 bg-neutral-50 text-neutral-950"
                >
                  <span>Markinventeringsdata</span>
                  <Icon name="mdi:lock-open" class="size-4" />
                </div>
                för att begränsa urvalet till miljöer där det finns data från
                markinventeringen.
                <UAlert
                  class="my-2"
                  icon="i-heroicons-light-bulb"
                  color="green"
                  variant="subtle"
                  title="Om val är inaktiverade kan det hjälpa att avvmarkera redan gjorda val."
                />
              </li>
            </ul>
          </div>
        </div>

        <!-- Miljöinformation Tab with Galleries -->
        <div
          v-else-if="activeTab === 'miljo'"
          class="border rounded-2xl p-6 border-neutral-200 bg-neutral-50"
        >
          <!-- <h1 size="xl" weight="light">Miljöinformation</h1> -->
          <div class="space-y-6 mt-4">
            <!-- Gallery for Geography -->
            <div>
              <h1 size="lg" weight="light" class="mb-2">Var i Sverige</h1>
              <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div
                  v-for="option in geographyOptions"
                  class="cursor-pointer rounded-xl overflow-hidden border border-neutral-200"
                  @click="openModal(option)"
                >
                  <div
                    class="bg-gray-200 h-40 rounded-lg flex items-center justify-center"
                  >
                    <div
                      class="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700"
                    >
                      <Icon
                        name="material-symbols:photo"
                        class="w-8 h-8 text-neutral-500"
                      />
                    </div>
                  </div>
                  <div class="p-2 text-md font-medium text-neutral-600">
                    {{ option.label }}
                  </div>
                </div>
              </div>
            </div>
            <!-- Gallery for Forest Type -->
            <div>
              <h1 size="lg" weight="light" class="mb-2">Skogstyp</h1>
              <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div
                  v-for="option in forestTypeOptions"
                  class="cursor-pointer rounded-xl overflow-hidden border border-neutral-200"
                  @click="openModal(option)"
                >
                  <div
                    class="bg-gray-200 h-40 rounded-lg flex items-center justify-center"
                  >
                    <div
                      class="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700"
                    >
                      <Icon
                        name="material-symbols:photo"
                        class="w-8 h-8 text-neutral-500"
                      />
                    </div>
                  </div>
                  <div class="p-2 text-md font-medium text-neutral-600">
                    {{ option.label }}
                  </div>
                </div>
              </div>
            </div>
            <!-- Gallery for Stand Age -->
            <div>
              <h1 size="lg" weight="light" class="mb-2">Beståndsålder</h1>
              <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div
                  v-for="option in standAgeOptions"
                  class="cursor-pointer rounded-xl overflow-hidden border border-neutral-200"
                  @click="openModal(option)"
                >
                  <div
                    class="bg-gray-200 h-40 rounded-lg flex items-center justify-center"
                  >
                    <div
                      class="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700"
                    >
                      <Icon
                        name="material-symbols:photo"
                        class="w-8 h-8 text-neutral-500"
                      />
                    </div>
                  </div>
                  <div class="p-2 text-md font-medium text-neutral-600">
                    {{ option.label }}
                  </div>
                </div>
              </div>
            </div>
            <!-- Gallery for Vegetation Type -->
            <div>
              <h1 size="lg" weight="light" class="mb-2">Fältskikt</h1>
              <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div
                  v-for="option in vegetationTypeOptions"
                  class="cursor-pointer rounded-xl overflow-hidden border border-neutral-200"
                  @click="openModal(option)"
                >
                  <div
                    class="bg-gray-200 h-40 rounded-lg flex items-center justify-center"
                  >
                    <div
                      class="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700"
                    >
                      <Icon
                        name="material-symbols:photo"
                        class="w-8 h-8 text-neutral-500"
                      />
                    </div>
                  </div>
                  <div class="p-2 text-md font-medium text-neutral-600">
                    {{ option.label }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Modal for Environment Details -->
          <UModal v-model="isModalOpen">
            <UCard>
              <template #header>
                <div class="flex justify-between items-center">
                  <h1 size="xl" weight="light">
                    {{ selectedOption?.label }}
                  </h1>
                  <Icon
                    @click="isModalOpen = false"
                    name="heroicons:x-mark"
                    class="size-5 cursor-pointer"
                  />
                </div>
              </template>
              <div class="">
                <div
                  class="bg-gray-200 h-64 rounded-lg flex items-center justify-center"
                >
                  <div
                    class="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700"
                  >
                    <Icon
                      name="material-symbols:photo"
                      class="w-8 h-8 text-neutral-500"
                    />
                  </div>
                </div>
                <div class="p-2 text-md font-medium text-neutral-600">
                  {{ selectedOption?.description }}
                </div>
              </div>
            </UCard>
          </UModal>
        </div>

        <!-- Dataunderlagsinformation Tab -->
        <div
          v-else-if="activeTab === 'dataunderlag'"
          class="border rounded-2xl p-6 border-neutral-200 bg-neutral-50"
        >
          <!-- <h1 size="xl" weight="light">
            Dataunderlagsinformation
          </h1>
          <div class="text-neutral-500 text-lg font-light">
            <p>
              Här visas information om det dataunderlag som används för
              analyserna.
            </p>
          </div> -->
          <div
            class="grid grid-cols-1 md:grid-cols-2 md:gap-32 gap-16 mx-6 mt-12"
          >
            <LandingDNA />
            <LandingSamladKunskap />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const activeTab = ref("komigang");

const items = [
  { label: "Kom igång", value: "komigang" },
  { label: "Miljöinformation", value: "miljo" },
  { label: "Dataunderlagsinformation", value: "dataunderlag" },
];

// Computed property that maps between the activeTab value and its index.
const selectedIndex = computed({
  get() {
    const index = items.findIndex((item) => item.value === activeTab.value);
    return index === -1 ? 0 : index;
  },
  set(index) {
    activeTab.value = items[index].value;
  },
});

// --- Options (from EnvironmentTitle.vue) ---
const geographyOptions = [
  {
    value: "Norr",
    label: "Norra Sverige",
    description: "Norr om breddgrad 60°",
  },
  {
    value: "Söder",
    label: "Södra Sverige",
    description: "Söder om breddgrad 60°",
  },
];

const forestTypeOptions = [
  {
    value: "Granskog",
    label: "Granskog",
    description: "Minst 70% barrträd, och minst 70% av dessa är gran",
  },
  {
    value: "Tallskog",
    label: "Tallskog",
    description: "Minst 70% barrträd, och minst 70% av dessa är tall",
  },
  {
    value: "Barrblandskog",
    label: "Barrblandskog",
    description: "Minst 70% barrträd, men varken tall eller gran uppnår 70%",
  },
  {
    value: "Lövblandskog",
    label: "Blandskog",
    description: "31-69% lövträd eller barrträd",
  },
  {
    value: "EkBokskog",
    label: "Ek och Bokskog",
    description: "Minst 70% lövträd, och minst 70% av dessa är ek eller bok",
  },
  {
    value: "Lövskog",
    label: "Övrig lövskog",
    description: "Minst 70% lövträd",
  },
  {
    value: "Naturbete",
    label: "Trädklädd betesmark",
    description: "Trädbevuxna gräsmarker som används för betesdjur",
  },
];

const standAgeOptions = [
  {
    value: "1-40",
    label: "1-40 år",
    description: "Trädbeståndets medelålder är mellan 1 och 40 år",
  },
  {
    value: "41-90",
    label: "41-90 år",
    description: "Trädbeståndets medelålder är mellan 41 och 90 år",
  },
  {
    value: "91",
    label: "91 år och äldre",
    description: "Trädbeståndets medelålder är äldre än 90 år",
  },
  {
    value: "allaåldrar",
    label: "Alla åldrar",
    description: "Inkluderar trädbestånds med alla trädmedelåldrar",
  },
];

const vegetationTypeOptions = [
  {
    value: "Örter_grupp",
    label: "Örttyper",
    description:
      "Näringsrik mark med fältskikt som innehåller högörter, lågörter och bredbladiga gräs",
  },
  {
    value: "Blåbär_grupp",
    label: "Blåbärstyper",
    description: "Fältskikt som domineras av blåbär och smalbladiga gräs",
  },
  {
    value: "Lingon_grupp",
    label: "Lingon-fattigristyper",
    description:
      "Näringsfattig mark med fältskikt som domineras av lingon, kråkbär, ljung, eller andra fattigris",
  },
];

// --- Modal state ---
const isModalOpen = ref(false);
const selectedOption = ref(null);

function openModal(option) {
  selectedOption.value = option;
  isModalOpen.value = true;
}
</script>
