<template>
  <div>
    <hr class="mb-4" />
    <div class="grid grid-cols-4">
      <div class="col-span-3">
        <BaseHeading size="2xl" weight="light">
          Se vilka arter som kan finnas olika i skogsmiljöer.
        </BaseHeading>
        <BaseHeading size="lg" weight="light" class="text-neutral-500">
          Här kan du söka på svenska skogsmiljöer för att se vilka arter som kan
          finnas i marken baserat på DNA-analyser av svampmycel i jordprover
          samt vår samlade kunskap om var olika arters fruktkroppar förekommer.
        </BaseHeading>
        <hr class="my-6" />
        <BaseHeading size="xl" weight="light"> Instruktioner </BaseHeading>

        <div class="text-neutral-500 text-lg font-light">
          <ul class="space-y-4">
            <li>
              Välj skogsmiljö genom att ange var i Sverige (för närvarande
              begränsat till norr och söder), skogstyp (vilka träd som
              dominerar), beståndsålder (trädens ålder) och fältskikt (vilken
              vegetation som växer på marken).
            </li>
            <li>
              Klicka på respektive kategori för att göra dina val, eller använd
              knappen
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

      <!-- <NuxtImg src="/images/SvamparSverige4.svg" class="pt-2" /> -->
    </div>
  </div>
</template>

<script setup>
defineEmits(["close", "enlarge"]);
</script>
