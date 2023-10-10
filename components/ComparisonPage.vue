<!-- ComparisonPage.vue -->
<template>
    <div class="grid grid-cols-5 gap-4">
        <div v-for="env in environments" :key="env.query">
            <div class=" gap-2 mb-4">
                <BaseTag size="sm" shape="rounded" color="info" flavor="pastel" class="m-1">{{ env.query.geography.split(" ")[0] }}</BaseTag>
                <BaseTag size="sm" shape="rounded" color="success" flavor="pastel" class="m-1">{{ env.query.forestType }}</BaseTag>
                <BaseTag size="sm" shape="rounded" color="warning" flavor="pastel" class="m-1">{{ env.query.vegetationType }}</BaseTag>
                <BaseTag size="sm" shape="rounded" color="danger" flavor="pastel" class="m-1">{{ env.query.standAge.split(" ")[0] }}</BaseTag>
             </div>
                
             <BaseCard shape="curved" class="p-6 mb-4">
                <BaseHeading
                as="h4"
                size="sm"
                weight="medium"
                lead="tight"
                class="mb-2 text-muted-400"
              >
              Environment Info: 
              </BaseHeading>
              <BaseParagraph size="md" lead="tight" color="primary">
                {{ env.EnvironmentMessage }}
              </BaseParagraph>
            </BaseCard>

            <BaseCard shape="curved" class="p-6" color="primary">
                <BaseHeading
                  as="h4"
                  size="sm"
                  weight="medium"
                  lead="tight"
                  class="mb-2 "
                >
                Redlisted Species 
                </BaseHeading>
                <BaseHeading weight="semibold" size="4xl" lead="tight">
                    {{ env.RedListedMessage }}
                </BaseHeading>
              </BaseCard>

              

        </div>  
    </div>
  </template>
  
  <script setup>
  import { useComparisonStore } from '~/stores/comparisonStore';
  import { useTitleStore } from '~/stores/titleStore';
  import { onMounted } from 'vue';

  const titleStore = useTitleStore();

  onMounted(() => {
    titleStore.setTitle('Compare Environments');
    });

  const comparisonStore = useComparisonStore();
  const environments = comparisonStore.environments;

  console.log("Fetched environments: ", environments);  // Debugging line
  </script>
  
 
  