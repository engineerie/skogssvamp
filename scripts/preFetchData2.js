import { fetchDataDirectly } from "/Users/jacobbertilsson/Documents/NUXT Apps/LearningNUXT/my-nuxt-app/server/api/fetchData2.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Construct the equivalent of __dirname
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Options for the parameters
const geographyOptions = ["Norr", "Söder"];
const forestTypeOptions = [
  "Granskog",
  "Tallskog",
  "Barrblandskog",
  "Lövblandskog",
];
const vegetationTypeOptions = [
  "Blåbär",
  "Bredblad gräs",
  "Högört",
  "Kråkbär/Ljung", // Keep the actual database value here
  "Lingon",
  "Lågört",
  "Smalblad gräs",
  "Utan fältskikt",
];
const standAgeOptions = ["1-40", "41-90", "91"];

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

      // Replace "/" in vegetation type for file naming
      const safeVeg = veg.replace("/", "");

      // Format the fetched data as JSON and save to a file
      const filename = `data-${geo}-${forest}-${age}-${safeVeg}.json`;
      fs.writeFileSync(
        path.join(__dirname, `../static/${filename}`),
        JSON.stringify(data, null, 2) // Ensure JSON is pretty-printed for readability
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
