<template>
  <div class="grid gap-2">
    <UCard rounded="md" class="p-6">
      <div class="flex items-center">
        <Icon
          name="material-symbols:star-rounded"
          class="h-7 w-7 text-yellow-500 -mt-3 mr-1"
        />
        <h1
          as="h4"
          size="sm"
          weight="semibold"
          lead="tight"
          class="text-muted-800 mb-2 dark:text-white"
        >
          Mykorrhizan följer trädens rötter
        </h1>
      </div>

      <p size="sm" lead="tight" class="text-muted-400">
        Mykorrhizasvampars mycel finns så långt trädens rötter breder ut sig,
        10-15m. Rikligast med mykorrhiza närmast trädet.
      </p>
    </UCard>

    <UCard rounded="md" color="info" class="p-6">
      <h1
        as="h4"
        size="sm"
        weight="semibold"
        lead="tight"
        class="text-muted-800 mb-2 dark:text-white"
      >
        Matsvampsmycel (kort tid efter avverkning)
      </h1>

      <p color="info" size="sm" lead="tight" class="text-muted-400">
        Nästan alla matsvampar är mykorrhizasvampar och försvinner efter
        avverkning. De lever vidare om de växer vid hänsynsträd eller nära
        skogskant. Matsvampar börjar återetableras i ungskog från sporer som
        sprids in från näraliggande skogar.
      </p>
    </UCard>

    <UCard rounded="md" color="info" class="p-6">
      <h1
        as="h4"
        size="sm"
        weight="semibold"
        lead="tight"
        class="text-muted-800 mb-2 dark:text-white"
      >
        Matsvampsmycel (lång tid efter avverkning)
      </h1>

      <p size="sm" lead="tight" class="text-muted-400">
        Mängden matsvampar är större i äldre skog eftersom större träd har högre
        fotosyntes och kan skickar ner mer socker till sina rötter.
      </p>
    </UCard>

    <UCard rounded="md" color="danger" class="p-6">
      <h1
        as="h4"
        size="sm"
        weight="semibold"
        lead="tight"
        class="text-muted-800 mb-2 dark:text-white"
      >
        Mycel av rödlistade svampar
      </h1>

      <p size="sm" lead="tight" class="text-muted-400">
        Rödlistade mykorrhizasvampar har ofta speciella miljökrav, och är mest
        frekventa i äldre skog. Mykorrhizasvampars mycel kan leva vidare så
        länge det finns levande träd på en plats. Svampindividers mycel kan bli
        många decennier till potentiellt sekler gamla.
      </p>
    </UCard>

    <UCard rounded="md" class="p-6">
      <h1
        as="h4"
        size="sm"
        weight="semibold"
        lead="tight"
        class="text-muted-800 mb-2 dark:text-white"
      >
        Högstubbe
      </h1>

      <p size="sm" lead="tight" class="text-muted-400">
        Trädets rötter döda och därför inga levande mykorrhizamycel i marken.
      </p>
    </UCard>
    <UCard rounded="md" class="p-6">
      <h1
        as="h4"
        size="sm"
        weight="semibold"
        lead="tight"
        class="text-muted-800 mb-2 dark:text-white"
      >
        Stubbe
      </h1>

      <p size="sm" lead="tight" class="text-muted-400">
        Mykorrhizasvamparnas mycel på stubbens rötter tynar bort och dör inom
        ett par månader - ett år efter avverkningen.
      </p>
    </UCard>
    <UCard rounded="md" class="p-6">
      <h1
        as="h4"
        size="sm"
        weight="semibold"
        lead="tight"
        class="text-muted-800 mb-2 dark:text-white"
      >
        Hänsynsträd
      </h1>

      <p size="sm" lead="tight" class="text-muted-400">
        Mykorrhizasvamparnas mycel lever vidare i hänsynsträdens rötter efter
        avverkning.
      </p>
    </UCard>
    <UCard rounded="md" class="p-6">
      <h1
        as="h4"
        size="sm"
        weight="semibold"
        lead="tight"
        class="text-muted-800 mb-2 dark:text-white"
      >
        Självföryngrade små trädplantor
      </h1>

      <p size="sm" lead="tight" class="text-muted-400">
        Små mycel av mykorrhizasvampar växer i rötterna.
      </p>
    </UCard>
    <UCard rounded="md" class="p-6">
      <h1
        as="h4"
        size="sm"
        weight="semibold"
        lead="tight"
        class="text-muted-800 mb-2 dark:text-white"
      >
        Trädkant mot avverkning
      </h1>

      <p size="sm" lead="tight" class="text-muted-400">
        Mykorrhizasvampar mycel växer med rötterna så långt de sträcker sig in
        på avverkningen, 10-15 m. Mest närmast skogskanten.
      </p>
    </UCard>
    <UCard rounded="md" class="p-6">
      <h1
        as="h4"
        size="sm"
        weight="semibold"
        lead="tight"
        class="text-muted-800 mb-2 dark:text-white"
      >
        Tomma områden utan nära träd och småplantor direkt efter avverkning.
      </h1>

      <p size="sm" lead="tight" class="text-muted-400">
        Utan levande trädrötter dör mykorrhizasvamparnas mycel i marken. Få
        mykorrhizasvampar har en sporbank.
      </p>
    </UCard>
  </div>
</template>
