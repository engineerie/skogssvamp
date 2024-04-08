// scripts/ediblePrefetchData.js

import { fetchEdibleDataDirectly } from "/Users/jacobbertilsson/Documents/NUXT Apps/LearningNUXT/my-nuxt-app/server/api/edibleFetchData.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const geographyOptions = ["North Sweden", "South Sweden"];
const forestTypeOptions = [
  "Spruce",
  "Pine",
  "Mixed Coniferous",
  "Mixed Deciduous",
];
const vegetationTypeOptions = [
  "Tall herbs",
  "Low herbs",
  "No field layer",
  "Broad grasses",
  "Narrow grasses",
  "Blueberry",
  "Lingonberry",
  "Crowberry/heather",
];
const standAgeOptions = ["1-40 years", "41-90 years", "91< years"];

let allCombinations = [];

for (let geo of geographyOptions) {
  for (let forest of forestTypeOptions) {
    for (let veg of vegetationTypeOptions) {
      for (let age of standAgeOptions) {
        allCombinations.push({ geo, forest, veg, age });
      }
    }
  }
}

const mapGeographyToColumn = {
  "North Sweden": "Norra Sverige",
  "South Sweden": "Södra Sverige",
};

const mapForestTypeToColumn = {
  Spruce: "Gran",
  Pine: "Tall",
  "Mixed Coniferous": "Blandad barrskog",
  "Mixed Deciduous": "Blandad lövskog",
};

const mapVegetationTypeToColumn = {
  "Tall herbs": "högört",
  "Low herbs": "lågört",
  "No field layer": null, // Adjust if there's a corresponding column
  "Broad grasses": "bredbladigt gräs",
  "Narrow grasses": "bmalbladigt gräs",
  Blueberry: "blåbär",
  Lingonberry: "lingon",
  "Crowberry/heather": "kråkbär ljung",
};

const mapStandAgeToColumn = {
  "1-40 years": "1-40 år",
  "41-90 years": "41-90 år",
  "91< years": "91år och äldre",
};

async function prefetchEdibleData() {
  for (const { geo, forest, veg, age } of allCombinations) {
    try {
      const data = await fetchEdibleDataDirectly({ geo, forest, veg, age });

      if (!data || data.length === 0) {
        console.log("No edible data fetched for combination", {
          geo,
          forest,
          veg,
          age,
        });
        continue;
      }

      const geographyColumn = mapGeographyToColumn[geo];
      const forestTypeColumn = mapForestTypeToColumn[forest];
      const vegetationTypeColumn = mapVegetationTypeToColumn[veg];
      const standAgeColumn = mapStandAgeToColumn[age];

      const filteredData = data.filter(
        (item) =>
          item[geographyColumn] === "x" &&
          (forestTypeColumn === null || item[forestTypeColumn] !== null) &&
          vegetationTypeColumn !== null &&
          item[vegetationTypeColumn] !== null && // Adjusted this line
          (standAgeColumn === null || item[standAgeColumn] !== null)
      );

      const filename = `edibledata-${geo}-${forest}-${age}-${veg}.json`;
      fs.writeFileSync(
        path.join(__dirname, `../static/${filename}`),
        JSON.stringify(filteredData)
      );
      console.log(`Edible data pre-fetching complete for ${filename}.`);
    } catch (error) {
      console.error(
        "Error during edible data prefetch for combination",
        { geo, forest, veg, age },
        ":",
        error
      );
    }
  }
}

// Execute the prefetch function
prefetchEdibleData();
