<template>

      <div class="p-5 w-fit bg-neutral-100 dark:bg-neutral-800 dark:bg-opacity-100 border-[1px] dark:border-stone-700 border-stone-300 rounded-xl">
  
        

    <div>
        <BaseHeading size="md" class="mb-4">Beräkna</BaseHeading>

        <!-- Form wrapping the inputs and calculate button -->
        <form @submit.prevent="calculate">
            <div>
                <BaseHeading size="sm" class="mb-4">Hyggestorlek</BaseHeading>
                <div v-for="(harvest, index) in harvestAreas" :key="'harvest-' + index" class="flex gap-4">
                    <BaseInput shape="curved" type="number" step="any" label="Hyggestorlek (ha)" v-model="harvest.area" />
                    <BaseButtonClose color="muted" v-if="harvestAreas.length > 1" class="mt-2 w-5 h-5" shape="full" @click="removeHarvestArea(index)"/>
                </div>
                <BaseButtonAction color="muted" class="my-2 w-5 h-5" shape="full" @click="addHarvestArea"> + </BaseButtonAction>
            </div>
            <div class="flex items-center gap-4">
                <BaseInput shape="curved" type="number" step="any" label="Trädhöjd (m)" v-model="treeHeight" />
            </div>
            <div><br>
                <BaseHeading size="sm" class="mb-4">Hänsyn</BaseHeading>
                <div v-for="(group, index) in treeGroups" :key="index" class="flex gap-4">
                    <BaseInput  shape="curved" type="number" step="any" label="Gruppställda hänsynsträd (m²)" v-model="group.area" />
                    <!-- Add a condition to show the remove button only if more than one group exists -->
                    <BaseButtonClose color="muted" v-if="treeGroups.length > 1" class="mt-2 w-5 h-5" shape="full" @click="removeTreeGroup(index)"/>
                </div>
                <BaseButtonAction color="muted" class="my-2 w-5 h-5" shape="full" @click="addTreeGroup"> + </BaseButtonAction>
            </div>
            <div class="flex">
                <BaseInput shape="curved" type="number" label="Enstaka hänsynsträd" v-model="numTrees" />
            </div>

            <!-- Calculate button now submits the form -->
            <BaseButtonAction color="primary" class="mt-2" shape="curved" type="submit">Beräkna</BaseButtonAction>
            
        </form>
    </div>

   

</div>
<div v-if ="result" class="p-5 w-fit mt-4 bg-neutral-100 dark:bg-neutral-800 dark:bg-opacity-100 border-[1px] dark:border-stone-700 border-stone-300 rounded-xl">

<div>
    <p class="text-2xl font-bold" >{{ result }} ha</p>
    <p class="text-sm text-muted-500">Yta där marksvamp försvinner</p>
</div>
</div>
<div v-if ="percentage" class="p-5 w-fit mt-4 bg-neutral-100 dark:bg-neutral-800 dark:bg-opacity-100 border-[1px] dark:border-stone-700 border-stone-300 rounded-xl">

    <div>
        <p class="text-2xl font-bold" >{{ percentage }} %</p>
        <p class="text-sm text-muted-500" >Andel marksvamp bevarad </p>
    </div>
</div>
</template>
<script>
export default {
    data() {
        return {
            treeHeight: 0,
            harvestArea: 0,
            treeGroups: [{ area: 0 }],
            numTrees: 0,
            result: null,
            precentage: null,
            harvestAreas: [{ area: 0 }], // Array for multiple harvest areas
        };
    },
    methods: {
        removeTreeGroup(index) {
            if (this.treeGroups.length > 1) {
                this.treeGroups.splice(index, 1);
            }
        },
        addTreeGroup() {
            this.treeGroups.push({ area: 0 });
        },
        addHarvestArea() {
            this.harvestAreas.push({ area: 0 });
        },
        removeHarvestArea(index) {
            if (this.harvestAreas.length > 1) {
                this.harvestAreas.splice(index, 1);
            }
        },
 
        calculate() {
            let totalAreaTreeGroup = 0;
            for (const group of this.treeGroups) {
                if (group.area > 0) {
                    // Calculate the effective area for tree groups
                    const groupDiameter = Math.sqrt(group.area / Math.PI) * 2 + this.treeHeight;
                    const groupArea = Math.PI * Math.pow(groupDiameter / 2, 2);
                    totalAreaTreeGroup += groupArea;
                }
            }

            const treeDiameter = this.treeHeight;
            const treeArea = Math.PI * Math.pow(treeDiameter / 2, 2);
            const totalAreaIndividualTree = treeArea * this.numTrees;

            let totalHarvestAreaWithoutEdgeEffect = 0;
            let totalHarvestAreaWithEdgeEffect = 0;
            for (const harvest of this.harvestAreas) {
                // Convert each harvest area from hectares to square meters
                let harvestAreaInSquareMeters = harvest.area * 10000;
                totalHarvestAreaWithoutEdgeEffect += harvestAreaInSquareMeters;

                // Calculate the diameter of the harvest area
                const harvestAreaDiameter = Math.sqrt(harvestAreaInSquareMeters / Math.PI) * 2;
                // Apply the edge effect by reducing the diameter
                const modifiedDiameter = Math.max(0, harvestAreaDiameter - this.treeHeight);
                // Calculate the area after applying the edge effect
                let modifiedHarvestArea = Math.PI * Math.pow(modifiedDiameter / 2, 2);
                totalHarvestAreaWithEdgeEffect += modifiedHarvestArea;
            }

            // Calculate the total affected area
            const totalFungiAreaAffected = Math.max(0, totalHarvestAreaWithEdgeEffect - totalAreaTreeGroup - totalAreaIndividualTree);
            // Convert to hectares (1 hectare = 10000 square meters)
            const totalFungiAreaAffectedHectar = totalFungiAreaAffected / 10000;
            this.result = totalFungiAreaAffectedHectar.toFixed(2);

            // Calculate the percentage of fungi area saved
            if (totalHarvestAreaWithoutEdgeEffect > 0) {
                const percentage = (1 - totalFungiAreaAffected / totalHarvestAreaWithoutEdgeEffect) * 100;
                this.percentage = percentage.toFixed(0);
            } else {
                this.percentage = 'N/A';
            }
        }
    },
};
</script>

