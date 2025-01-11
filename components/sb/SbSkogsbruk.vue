<template>
  <div class="grid gap-2">
    <BaseCard rounded="md" class="p-6">
      <div class="flex items-center">
        <Icon
          name="material-symbols:star-rounded"
          class="h-7 w-7 text-yellow-500 -mt-3 mr-1"
        />
        <BaseHeading
          as="h4"
          size="sm"
          weight="semibold"
          lead="tight"
          class="text-muted-800 mb-2 dark:text-white"
        >
          Mykorrhizan följer trädens rötter
        </BaseHeading>
      </div>

      <BaseParagraph size="sm" lead="tight" class="text-muted-400">
        Mykorrhizasvampars mycel finns så långt trädens rötter breder ut sig,
        10-15m. Rikligast med mykorrhiza närmast trädet.
      </BaseParagraph>
    </BaseCard>

    <BaseCard rounded="md" color="info" class="p-6">
      <BaseHeading
        as="h4"
        size="sm"
        weight="semibold"
        lead="tight"
        class="text-muted-800 mb-2 dark:text-white"
      >
        Matsvampsmycel (kort tid efter avverkning)
      </BaseHeading>

      <BaseParagraph color="info" size="sm" lead="tight" class="text-muted-400">
        Nästan alla matsvampar är mykorrhizasvampar och försvinner efter
        avverkning. De lever vidare om de växer vid hänsynsträd eller nära
        skogskant. Matsvampar börjar återetableras i ungskog från sporer som
        sprids in från näraliggande skogar.
      </BaseParagraph>
    </BaseCard>

    <BaseCard rounded="md" color="info" class="p-6">
      <BaseHeading
        as="h4"
        size="sm"
        weight="semibold"
        lead="tight"
        class="text-muted-800 mb-2 dark:text-white"
      >
        Matsvampsmycel (lång tid efter avverkning)
      </BaseHeading>

      <BaseParagraph size="sm" lead="tight" class="text-muted-400">
        Mängden matsvampar är större i äldre skog eftersom större träd har högre
        fotosyntes och kan skickar ner mer socker till sina rötter.
      </BaseParagraph>
    </BaseCard>

    <BaseCard rounded="md" color="danger" class="p-6">
      <BaseHeading
        as="h4"
        size="sm"
        weight="semibold"
        lead="tight"
        class="text-muted-800 mb-2 dark:text-white"
      >
        Mycel av rödlistade svampar
      </BaseHeading>

      <BaseParagraph size="sm" lead="tight" class="text-muted-400">
        Rödlistade mykorrhizasvampar har ofta speciella miljökrav, och är mest
        frekventa i äldre skog. Mykorrhizasvampars mycel kan leva vidare så
        länge det finns levande träd på en plats. Svampindividers mycel kan bli
        många decennier till potentiellt sekler gamla.
      </BaseParagraph>
    </BaseCard>

    <BaseCard rounded="md" class="p-6">
      <BaseHeading
        as="h4"
        size="sm"
        weight="semibold"
        lead="tight"
        class="text-muted-800 mb-2 dark:text-white"
      >
        Högstubbe
      </BaseHeading>

      <BaseParagraph size="sm" lead="tight" class="text-muted-400">
        Trädets rötter döda och därför inga levande mykorrhizamycel i marken.
      </BaseParagraph>
    </BaseCard>
    <BaseCard rounded="md" class="p-6">
      <BaseHeading
        as="h4"
        size="sm"
        weight="semibold"
        lead="tight"
        class="text-muted-800 mb-2 dark:text-white"
      >
        Stubbe
      </BaseHeading>

      <BaseParagraph size="sm" lead="tight" class="text-muted-400">
        Mykorrhizasvamparnas mycel på stubbens rötter tynar bort och dör inom
        ett par månader - ett år efter avverkningen.
      </BaseParagraph>
    </BaseCard>
    <BaseCard rounded="md" class="p-6">
      <BaseHeading
        as="h4"
        size="sm"
        weight="semibold"
        lead="tight"
        class="text-muted-800 mb-2 dark:text-white"
      >
        Hänsynsträd
      </BaseHeading>

      <BaseParagraph size="sm" lead="tight" class="text-muted-400">
        Mykorrhizasvamparnas mycel lever vidare i hänsynsträdens rötter efter
        avverkning.
      </BaseParagraph>
    </BaseCard>
    <BaseCard rounded="md" class="p-6">
      <BaseHeading
        as="h4"
        size="sm"
        weight="semibold"
        lead="tight"
        class="text-muted-800 mb-2 dark:text-white"
      >
        Självföryngrade små trädplantor
      </BaseHeading>

      <BaseParagraph size="sm" lead="tight" class="text-muted-400">
        Små mycel av mykorrhizasvampar växer i rötterna.
      </BaseParagraph>
    </BaseCard>
    <BaseCard rounded="md" class="p-6">
      <BaseHeading
        as="h4"
        size="sm"
        weight="semibold"
        lead="tight"
        class="text-muted-800 mb-2 dark:text-white"
      >
        Trädkant mot avverkning
      </BaseHeading>

      <BaseParagraph size="sm" lead="tight" class="text-muted-400">
        Mykorrhizasvampar mycel växer med rötterna så långt de sträcker sig in
        på avverkningen, 10-15 m. Mest närmast skogskanten.
      </BaseParagraph>
    </BaseCard>
    <BaseCard rounded="md" class="p-6">
      <BaseHeading
        as="h4"
        size="sm"
        weight="semibold"
        lead="tight"
        class="text-muted-800 mb-2 dark:text-white"
      >
        Tomma områden utan nära träd och småplantor direkt efter avverkning.
      </BaseHeading>

      <BaseParagraph size="sm" lead="tight" class="text-muted-400">
        Utan levande trädrötter dör mykorrhizasvamparnas mycel i marken. Få
        mykorrhizasvampar har en sporbank.
      </BaseParagraph>
    </BaseCard>
  </div>
</template>
