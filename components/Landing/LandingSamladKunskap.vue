<template>
  <div class="items-center">
    <div class="relative px-10 mb-8">
      <img src="/images/SamladKunskap.svg" />
    </div>
    <div class="">
      <div class="flex gap-2">
        <UBadge
          icon="i-material-symbols-location-on-outline"
          size="md"
          color="teal"
          variant="subtle"
          :ui="{ rounded: 'rounded-full' }"
          class="my-2"
        >
          <Icon
            name="material-symbols:award-star-outline"
            class="text-teal-500 mr-1"
          />
          Naturvårdsarter
        </UBadge>
        <UBadge
          icon="i-material-symbols-location-on-outline"
          size="md"
          color="yellow"
          variant="subtle"
          :ui="{ rounded: 'rounded-full' }"
          class="my-2"
        >
          <Icon
            name="icon-park-solid:knife-fork"
            class="text-yellow-500 mr-1"
          />
          Matsvampar
        </UBadge>
        <UBadge
          icon="i-material-symbols-location-on-outline"
          size="md"
          color="lime"
          variant="subtle"
          :ui="{ rounded: 'rounded-full' }"
          class="my-2"
        >
          <Icon name="hugeicons:danger" class="text-lime-500 mr-1" />
          Giftsvampar
        </UBadge>
      </div>
      <BaseHeading
        size=""
        class="text-neutral-950 dark:text-neutral-200 text-xl md:text-2xl"
      >
        Samlad kunskap från fruktkroppar
      </BaseHeading>
      <!-- <BaseHeading
        lead="tight"
        size="2xl"
        class="text-primary-500 dark:text-neutral-200 mb-1"
      >
        från fruktkroppsfynd
      </BaseHeading> -->
      <!-- Description -->
      <BaseHeading
        weight="semi-bold"
        size=""
        class="text-neutral-500 dark:text-neutral-400 mb-6 text-md md:text-lg"
      >
        Våra kunskaper om svampar och deras ekologi baseras främst på uppgifter
        om fruktkroppar. Här har vi sammanställt sådan information om mat- och
        giftsvampar samt naturvårdsintressanta svampar (rödlistade och
        signalarter).
      </BaseHeading>
      <div class="flex items-start">
        <!-- Navigation Buttons -->
        <!-- <div class="flex gap-4">
          <NuxtLink to="/svampdata">
            <BaseButton color="primary" size="md" shape="full">
              <Icon name="mdi:file-cog-outline" class="-ms-1 mr-1 size-5" />
              <span>Läs dokumentation</span>
            </BaseButton>
          </NuxtLink>
        </div> -->
      </div>
    </div>
  </div>
</template>
