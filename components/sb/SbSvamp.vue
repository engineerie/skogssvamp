<template>
  <div class="flex items-end mb-4 mt-2">
    <Icon
      name="material-symbols:info-rounded"
      class="h-9 w-9 text-green-500 mr-2"
    />
    <h1 size="2xl" weight="thin" class="text-neutral-800 dark:text-neutral-200">
      Välj miljö
    </h1>
  </div>

  <UCard class="relative mb-4">
    <p class="ml-2 my-2">
      Sök och klicka på kartan för att hämta information om geografi och
      skogstyp från nationell marktäckedata. Du kan även välja manuellt i
      kategorierna nedanför. Observera att beståndsålder och markvegetation
      alltid måste anges manuellt.
    </p>
  </UCard>

  <DefinitionerMiljö />
</template>
