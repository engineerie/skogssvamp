// scripts/prefetchData.js

import { fetchDataDirectly } from "/Users/jacobbertilsson/Documents/NUXT Apps/LearningNUXT/my-nuxt-app/server/api/fetchData.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Construct the equivalent of __dirname
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Mapping for converting string values to numeric IDs
const forestTypeMap = {
  Pine: 1,
  Spruce: 2,
  "Mixed Deciduous": 3,
  "Mixed Coniferous": 4,
};

const vegetationTypeMap = {
  "Tall herbs": 1,
  "Low herbs": 2,
  "No field layer": 3,
  "Broad grasses": 4,
  "Narrow grasses": 5,
  Blueberry: 6,
  Lingonberry: 7,
  "Crowberry/heather": 8,
};

// Options for the parameters
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

// Generating all combinations of parameters
for (let geo of geographyOptions) {
  for (let forest of forestTypeOptions) {
    for (let veg of vegetationTypeOptions) {
      for (let age of standAgeOptions) {
        allCombinations.push({ geo, forest, veg, age });
      }
    }
  }
}

// Mapping of genera to their corresponding svamp-grupp values
const genusToSvampGrupp = {
  Acephala: "Saknas",
  Alpova: "Saknas",
  Amanita: "hattsvamp",
  Amphinema: "skinnsvamp",
  Boletus: "sopp",
  Byssocorticium: "skinnsvamp",
  Cenococcum: "Saknas",
  Chalciporus: "Saknas",
  Chamonixia: "tryffel",
  Chroogomphus: "Saknas",
  Clavulina: "Saknas",
  Cortinarius: "hattsvamp",
  Craterellus: "kantarell",
  Elaphomyces: "tryffel",
  Entoloma: "hattsvamp",
  Gautieria: "Saknas",
  Genea: "tryffel",
  Geopora: "Saknas",
  Hebeloma: "hattsvamp",
  Helvellosebacina: "Saknas",
  Humaria: "skålsvamp",
  Hyaloscypha: "Saknas",
  Hydnotrya: "tryffel",
  Hydnum: "Saknas",
  Hygrophorus: "hattsvamp",
  Hymenogaster: "tryffel",
  Hysterangium: "Saknas",
  Imleria: "sopp",
  Inocybe: "hattsvamp",
  Laccaria: "hattsvamp",
  Lactarius: "hattsvamp",
  Leccinum: "sopp",
  Melanogaster: "tryffel",
  Naucoria: "hattsvamp",
  Otidea: "skålsvamp",
  Paxillus: "hattsvamp",
  Phellodon: "taggsvamp",
  Piloderma: "skinnsvamp",
  Pseudotomentella: "Saknas",
  Ramaria: "Saknas",
  Rhizopogon: "tryffel",
  Russula: "hattsvamp",
  Scleroderma: "tryffel",
  Sebacina: "Saknas",
  Serendipita: "Saknas",
  Sistotrema: "övrigt",
  Suillus: "sopp",
  Tarzetta: "Saknas",
  Thelephora: "skinnsvamp",
  Tomentella: "skinnsvamp",
  Tomentellopsis: "skinnsvamp",
  Tretomyces: "skinnsvamp",
  Tricholoma: "hattsvamp",
  Trichophaea: "Saknas",
  Tuber: "Saknas",
  Tylopilus: "sopp",
  Tylospora: "skinnsvamp",
  Wilcoxina: "Saknas",
  Xerocomellus: "sopp",
  Xerocomus: "sopp",
};

async function prefetchData() {
  for (const { geo, forest, veg, age } of allCombinations) {
    try {
      console.log("Fetching data for:", { geo, forest, veg, age });

      // Convert string values to their corresponding numeric IDs
      const mappedForestType = forestTypeMap[forest];
      const mappedVegType = vegetationTypeMap[veg];

      if (mappedForestType === undefined || mappedVegType === undefined) {
        console.error("Mapping not found for:", { forest, veg });
        continue;
      }

      const data = await fetchDataDirectly({
        geography: geo,
        forestType: mappedForestType,
        vegetationType: mappedVegType,
        standAge: age,
      });

      if (!data || data.length === 0) {
        console.log("No data fetched for combination", {
          geo,
          forest,
          veg,
          age,
        });
        continue;
      }

      // Add Svamp-grupp-släkte to each entry in the data
      const enrichedData = data.map((entry) => {
        const genus = entry.Genus;
        const svampGruppSlakte = genusToSvampGrupp[genus] || "Saknas";
        return {
          ...entry,
          "Svamp-grupp-släkte": svampGruppSlakte,
        };
      });

      const filename = `data-${geo}-${forest}-${age}-${veg}.json`;
      fs.writeFileSync(
        path.join(__dirname, `../static/${filename}`),
        JSON.stringify(enrichedData, null, 2) // Ensure JSON is pretty-printed for readability
      );
      console.log(`Data pre-fetching complete for ${filename}.`);
    } catch (error) {
      console.error(
        "Error during data prefetch for combination",
        { geo, forest, veg, age },
        ":",
        error
      );
    }
  }
}

// Execute the prefetch function
prefetchData();
