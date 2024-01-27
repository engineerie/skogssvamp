<template>
     <BaseHeading size="lg" weight="normal" class="my-4">Svampdata</BaseHeading>
          <BaseHeading size="sm" weight="normal" class="my-4">Sök i Karta</BaseHeading>
          <div class="p-6 border-[1px] dark:border-stone-700 border-stone-200 rounded-xl">
          <BaseInput
      v-model="fields.first"
      shape="full"
      label="Plats"
      type="search"
      placeholder="Sök plats..."
      icon="lucide:search"
    /></div>
    <div class="flex justify-end mr-2">
    <BaseButton shape="full" size="sm" disabled flavor="solid" color="primary" class="mt-4">
                <span>Sök</span>
                <Icon name="lucide:arrow-right" class="me-1 h-4 w-4" />
    </BaseButton>
  </div>
    <BaseHeading size="sm" weight="normal" class="my-4 mt-8">Sök på beståndstyp</BaseHeading>
  <ListBoxRow/>
</template>

<script setup>
const fields = reactive({
  first: '',
  second: '',
  third: '',
  fourth: '',
})
</script>