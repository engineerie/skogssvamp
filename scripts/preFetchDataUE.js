// scripts/preFetchDataUE.js

import { fetchDataDirectly } from "/Users/jacobbertilsson/Documents/NUXT Apps/LearningNUXT/my-nuxt-app/server/api/fetchData2.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import csvWriter from "csv-write-stream";

// Mapping of genera to their corresponding svamp-grupp values
const genusToSvampGrupp = {
  Acephala: "övrigt",
  Alpova: "tryffel",
  Amanita: "hattsvamp",
  Amphinema: "skinnsvamp",
  Boletus: "sopp",
  Byssocorticium: "skinnsvamp",
  Cenococcum: "övrigt",
  Chalciporus: "sopp",
  Chamonixia: "sopp",
  Chroogomphus: "hattsvamp",
  Clavulina: "fingersvamp",
  Cortinarius: "hattsvamp",
  Craterellus: "kantarell",
  Elaphomyces: "tryffel",
  Entoloma: "hattsvamp",
  Gautieria: "tryffel",
  Genea: "tryffel",
  Geopora: "tryffel",
  Hebeloma: "hattsvamp",
  Helvellosebacina: "övrigt",
  Humaria: "skålsvamp",
  Hyaloscypha: "skålsvamp",
  Hydnotrya: "tryffel",
  Hydnum: "taggsvamp",
  Hygrophorus: "hattsvamp",
  Hymenogaster: "tryffel",
  Hysterangium: "tryffel",
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
  Pseudotomentella: "skinnsvamp",
  Ramaria: "fingersvamp",
  Rhizopogon: "tryffel",
  Russula: "hattsvamp",
  Scleroderma: "tryffel",
  Sebacina: "övrigt",
  Serendipita: "övrigt",
  Sistotrema: "övrigt",
  Suillus: "sopp",
  Tarzetta: "skålsvamp",
  Thelephora: "skinnsvamp",
  Tomentella: "skinnsvamp",
  Tomentellopsis: "skinnsvamp",
  Tretomyces: "skinnsvamp",
  Tricholoma: "hattsvamp",
  Trichophaea: "skålsvamp",
  Tuber: "tryffel",
  Tylopilus: "sopp",
  Tylospora: "skinnsvamp",
  Wilcoxina: "skålsvamp",
  Xerocomellus: "sopp",
  Xerocomus: "sopp",
};

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Options for the parameters
const geographyOptions = ["Norr", "Söder"];
const forestTypeOptions = [
  "Granskog",
  "Tallskog",
  "Barrblandskog",
  "Lövblandskog",
  "Lövskog",
  "Naturbete",
  "EkBokskog",
];
const vegetationTypeOptions = [
  "Blåbär",
  "Bredblad gräs",
  "Högört",
  "Kråkbär/Ljung",
  "Lingon",
  "Lågört",
  "Smalblad gräs",
  "Utan fältskikt",
];
const standAgeOptions = ["1-40", "41-90", "91", "allaåldrar"];

// Generating all combinations of parameters
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

let writer = csvWriter({
  headers: [
    "SpeciesCode",
    "taxon",
    "snamn",
    "total_presence",
    "svamp-grupp-släkte",
    "geographyOptions",
    "forestTypeOptions",
    "vegetationTypeOptions",
    "standAgeOptions",
  ],
});
writer.pipe(
  fs.createWriteStream(path.join(__dirname, "../static/allSpeciesData.csv"))
);

async function prefetchDataForUE() {
  for (const { geo, forest, veg, age } of allCombinations) {
    console.log("Fetching data for:", { geo, forest, veg, age });

    const data = await fetchDataDirectly({
      geography: geo,
      forestType: forest,
      vegetationType: veg,
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

    // Enrich data with 'svamp-grupp-släkte'
    data.forEach((entry) => {
      const genus = entry.Genus;
      const svampGruppSlakte = genusToSvampGrupp[genus] || "Saknas";
      writer.write([
        entry.SpeciesCode,
        entry.taxon,
        entry.snamn,
        entry.total_presence,
        svampGruppSlakte,
        geo,
        forest,
        veg,
        age,
      ]);
    });
  }

  writer.end();
  console.log("CSV generation completed.");
}

prefetchDataForUE();
