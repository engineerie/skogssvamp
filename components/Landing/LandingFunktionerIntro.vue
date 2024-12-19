<template>
  <div class="flex">
    <NuxtLink to="/svampdata">
      <div
        class="-rotate-6 bg-neutral-100 backdrop-blur-2xl bg-opacity-40 shadow-xl hover:bg-green-100 hover:bg-opacity-20 hover:dark:brightness-110 dark:bg-neutral-900 p-6 w-72 rounded-xl border-neutral-300 dark:border-neutral-700 border-[0.5px]"
      >
        <div
          class="w-12 h-12 mb-4 rounded-lg text-green-500 flex justify-center items-center border-[0.5px] dark:border-neutral-700 border-neutral-300 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-neutral-300 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800"
        >
          <Icon name="mingcute:mushroom-line" class="h-6 w-6" />
        </div>
        <BaseHeading weight="normal" size="lg" class="mb-2">
          Svamparter i olika skogar
        </BaseHeading>
        <BaseHeading weight="light" size="md" class="mb-4 text-neutral-500">
          Ta del av nysammanställd information om vilka svampar som finns i
          olika skogsmiljöer.
        </BaseHeading>
        <Icon name="lucide:arrow-right" class="h-5 w-5" />
      </div>
    </NuxtLink>
    <NuxtLink to="/skogsbruk">
      <div
        class="rotate-6 bg-neutral-100 backdrop-blur-2xl bg-opacity-40 shadow-xl hover:bg-green-100 hover:bg-opacity-20 hover:dark:brightness-110 dark:bg-neutral-900 p-6 w-72 rounded-xl border-neutral-300 dark:border-neutral-700 border-[0.5px]"
      >
        <div
          class="w-12 h-12 mb-4 rounded-lg text-green-500 flex justify-center items-center border-[0.5px] dark:border-neutral-700 border-neutral-300 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-neutral-300 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800"
        >
          <Icon name="jam:tree" class="h-7 w-7" />
        </div>
        <BaseHeading weight="normal" size="lg" class="mb-2">
          Svampar och skogsbruk
        </BaseHeading>
        <BaseHeading weight="light" size="md" class="mb-4 text-neutral-500">
          Lär dig om hur svampar och träd hänger ihop, och se hur marksvampar
          påverkas vid och efter avverkning.</BaseHeading
        >
        <Icon name="lucide:arrow-right" class="h-5 w-5" />
      </div>
    </NuxtLink>
  </div>
</template>
