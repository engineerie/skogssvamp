<template>
  <div class="relative p-6 bg-neutral-100 dark:bg-neutral-800 dark:bg-opacity-100 border  dark:border-stone-700 border-stone-300 rounded-xl ">
    <div class="flex justify-between items-center mb-4">
      <BaseHeading size="md" class="mb-4">Markinventeringsdata</BaseHeading>
      <div class="w-12 h-12 mb-4 rounded-lg text-violet-500 flex justify-center items-center  border-[0.5px] dark:border-neutral-700 border-neutral-300 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-neutral-300 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800">              
          <Icon name="solar:dna-bold-duotone" class="h-6 w-6" /> 
        </div>   
    </div>
    <SpatialForest :geography="geography" :forestType="forestType" :standAge="standAge" :vegetationType="vegetationType" class=""/>
    <div v-if="data" id="scrollbar" class="overscroll overflow-y-scroll h-96 pl-2">
      <div v-for="(row, index) in data" :key="row.taxon" class="flex justify-between items-center my-4">
        <!-- Left section with text and icon -->
        <div class="flex items-center gap-4">
          <Icon name="fluent:shape-organic-16-filled" :class="'h-8 w-8'" :style="{ color: allColors[index] }" />
          <div>
            <BaseProse class="text-neutral-500">
              {{ row.snamn ? capitalize(row.snamn) : 'saknar svenskt namn' }}
            </BaseProse>
            <BaseProse class="text-xs text-neutral-500">{{ capitalize(row.taxon) }}</BaseProse>
          </div>
        </div>
    
        <!-- Right section with matsvamp icon -->
        <div v-if="row.matsvamp === 1">
          <Icon name="icon-park-twotone:pot" class="h-8 w-8 mr-14 text-yellow-500" />
        </div>
      </div>
    </div>
    <div v-else>
      <p>No data available</p>
    </div>
  </div>

  
  
</template>


<script setup>
import { useRoute } from 'vue-router';

// Define props to receive data from the parent component
const props = defineProps({
  geography: String,
  forestType: String,
  standAge: String,
  vegetationType: String
});

const data = ref(null);
const allColors = ref([]);

const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const generateColors = (start, end, steps) => {
    const stepR = (end[0] - start[0]) / (steps - 1);
    const stepG = (end[1] - start[1]) / (steps - 1);
    const stepB = (end[2] - start[2]) / (steps - 1);
    const colors = [];

    for (let i = 0; i < steps; i++) {
      const r = Math.round(start[0] + stepR * i);
      const g = Math.round(start[1] + stepG * i);
      const b = Math.round(start[2] + stepB * i);
      colors.push(`rgb(${r},${g},${b})`);
    }
    return colors;
  };

// Fetching data on component mount
onMounted(async () => {
  const response = await fetch(`/api/fetchData?geography=${props.geography}&forestType=${props.forestType}&vegetationType=${props.vegetationType}&standAge=${props.standAge}`);
  const result = await response.json();
  data.value = result.data;

  const top4Colors = generateColors([82, 82, 82], [212, 212, 212], 4);
  const next10Colors = generateColors([22, 101, 52], [134, 239, 172], 10);
  const otherColors = generateColors([46, 16, 101], [232, 121, 249], data.value.length - 13);

  allColors.value = [...top4Colors, ...next10Colors, ...otherColors];
});


</script>





<style scoped>
  /* For Webkit browsers like Chrome, Safari */
  #scrollbar::-webkit-scrollbar {
    width: 12px; /* width of the entire scrollbar */
  }
  
  #scrollbar::-webkit-scrollbar-track {
    display: none; /* color of the tracking area */
  }
  
  #scrollbar::-webkit-scrollbar-thumb {
  display: block;
  background-color: #88888833;  /* color of the scroll thumb */
  border-radius: 20px; /* roundness of the scroll thumb */
  
}

#scrollbar:hover::-webkit-scrollbar-thumb {
  display: block;
}

/* For Firefox */
#scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #888 #f2f3f500;
  transition: scrollbar-color 1s ease-in-out;  /* transition effect for Firefox */
}

#scrollbar:hover {
  scrollbar-color: #888 #f2f3f5;
}

  </style>


