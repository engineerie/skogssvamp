<template>
  <div class="py-16 mt-12">
    <div class="container mx-auto px-6 text-center">
      <BaseHeading size="4xl" lead="thight" class="font-bold mb-4 text-center">
        Undersök vilka mykorrhizasvampar <br /><span class="text-primary-500"
          >som kan finnas i olika skogar</span
        >
      </BaseHeading>
      <p class="text-xl mb-10 text-neutral-500 mx-40 text-center">
        Här kan du söka på svenska skogsmiljöer för att se vilka arter som kan
        finnas i marken baserat på DNA-analyser av svampmycel i jordprover samt
        vår samlade kunskap om var olika arters fruktkroppar förekommer.
      </p>
    </div>
    <div class="container mx-auto px-6 lg:grid lg:grid-cols-2 lg:gap-8">
      <!-- Left Div: DNA Mykorrhizasvampar -->
      <!-- <div
        class="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 relative overflow-hidden ring-1 ring-neutral-200"
      >
 
        <BaseHeading
          weight="semi-bold"
          size="xl"
          class="text-neutral-950 dark:text-neutral-200 mb-1"
        >
          DNA-analys
        </BaseHeading>
  
        <p class="text-neutral-500 dark:text-neutral-400 mb-6">
          Mykorrhizasvampar identifierade genom DNA-analyser från 2500 skogar
          som undersökts av Markinventeringen.
        </p>

        <div class="relative w-full h-44">
          <NuxtImg
            src="/images/AllaMykorrhiza2.png"
            class="absolute top-0 left-8 bottom-0 rounded-lg h-auto w-[120%] object-cover object-top-left z-10 ring-1 ring-neutral-200"
          />
        </div>
      </div> -->

      <!-- Right Div: Naturvård & Matsvampar -->
      <!-- <div
        class="bg-gray-50 dark:bg-gray-800 rounded-2xl pt-6 px-6 pb-0 relative overflow-hidden ring-1 ring-neutral-200"
      >
      
        <BaseHeading
          weight="semi"
          class="text-neutral-950 dark:text-neutral-200 mb-1"
        >
          Samlad kunskap
        </BaseHeading>
        <p class="text-neutral-600 dark:text-neutral-400 mb-6">
          Naturvårdsarter och matsvampar visas engligt sakkunnigas kunskap om
          dem utifrån var deras fruktkroppar påträffas.
        </p>
        <div class="relative w-full h-44">
          <NuxtImg
            src="/images/Naturvård.png"
            class="absolute top-10 left-8 bottom-0 rounded-lg h-auto w-full object-cover object-top-left z-10 ring-1 ring-neutral-200"
          />
          <NuxtImg
            src="/images/Matsvamp.png"
            class="absolute top-0 left-28 bottom-0 rounded-lg h-auto w-full object-cover object-top-left z-20 ring-1 ring-neutral-200"
          />
        </div>
      </div> -->
    </div>
  </div>
</template>
