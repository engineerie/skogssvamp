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
  "Lövskog",
  "Naturbete",
  "EkBokskog",
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
const standAgeOptions = ["1-40", "41-90", "91", "allaåldrar"];
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
// Function to log data
function logToFile(data) {
  const logFilePath = path.join(__dirname, "app.log");
  fs.appendFileSync(logFilePath, data + "\n", { encoding: "utf8" });
}

async function prefetchData() {
  for (const { geo, forest, veg, age } of allCombinations) {
    const startMessage = `Starting fetch for combination: geo=${geo}, forest=${forest}, veg=${veg}, age=${age}`;
    console.log(startMessage);
    logToFile(startMessage); // Log to file

    try {
      const data = await fetchDataDirectly({
        geography: geo,
        forestType: forest,
        vegetationType: veg,
        standAge: age,
      });

      const fetchCompleteMessage = `Fetch complete for combination: geo=${geo}, forest=${forest}, veg=${veg}, age=${age}`;
      console.log(fetchCompleteMessage);
      logToFile(fetchCompleteMessage); // Log to file

      console.log(`Fetched data length: ${data.length}`);
      logToFile(`Fetched data length: ${data.length}`); // Log to file

      if (!data || data.length === 0) {
        const noDataMessage = `No data fetched for combination: geo=${geo}, forest=${forest}, veg=${veg}, age=${age}`;
        console.log(noDataMessage);
        logToFile(noDataMessage); // Log to file
        continue;
      }

      const safeVeg = veg.replace("/", "");
      const filename = `data-${geo}-${forest}-${age}-${safeVeg}.json`;
      const filePath = path.join(__dirname, `../static/${filename}`);

      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      const writtenMessage = `Data written to ${filePath}. File size: ${
        fs.statSync(filePath).size
      } bytes`;
      console.log(writtenMessage);
      logToFile(writtenMessage); // Log to file
    } catch (error) {
      const errorMessage = `Error during data fetch for combination: geo=${geo}, forest=${forest}, veg=${veg}, age=${age}: ${error}`;
      console.error(errorMessage);
      logToFile(errorMessage); // Log to file
    }
  }
}

// Execute the prefetch function
prefetchData();
