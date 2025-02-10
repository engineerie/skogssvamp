<template>
  <div class="text-neutral-600">information om artrikedom</div>
  <!-- <div id="chart">
    <VueApexCharts
      type="radialBar"
      height="300"
      :options="chartOptions"
      :series="chartSeries"
    />
  </div>
  <div>
    <BaseHeading weight="thin" size="sm" class="text-neutral-500"
      >Figuren visar hur mycelutbredningar kan se ut. Ofta täcker ca 10% av
      arterna ca 80% av marken.</BaseHeading
    >
  </div> -->
</template>

<!-- <script setup>
import { ref } from "vue";
import VueApexCharts from "vue3-apexcharts";

const chartOptions = ref({
  chart: {
    height: 300,
    type: "radialBar",
    offsetY: -10,
  },
  colors: ["#22c55e"],

  plotOptions: {
    radialBar: {
      startAngle: -90,
      endAngle: 90,
      dataLabels: {
        value: {
          offsetY: -20,
          fontSize: "22px",
          color: undefined,
          formatter: function (val) {
            return "";
          },
        },
      },
    },
  },
  fill: {},

  labels: [""],
});

const chartSeries = ref([67]);
</script> -->
