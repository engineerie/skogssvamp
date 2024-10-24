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

// Define the grouping of vegetation types
const vegetationGroupMapping = {
  Högört: "Högört, Lågört and Bredblad gräs",
  Lågört: "Högört, Lågört and Bredblad gräs",
  "Bredblad gräs": "Högört, Lågört and Bredblad gräs",
  Blåbär: "Blåbär and Smalblad gräs",
  "Smalblad gräs": "Blåbär and Smalblad gräs",
  Lingon: "Lingon, Kråkbär/Ljung",
  "Kråkbär/Ljung": "Lingon, Kråkbär/Ljung",
};

// Skip 'Utan fältskikt'
const validVegetationTypeOptions = [
  "Högört",
  "Lågört",
  "Bredblad gräs",
  "Blåbär",
  "Smalblad gräs",
  "Lingon",
  "Kråkbär/Ljung",
];

const standAgeOptions = ["1-40", "41-90", "91", "allaåldrar"];
let allCombinations = [];

// Generating all combinations of parameters
for (let geo of geographyOptions) {
  for (let forest of forestTypeOptions) {
    for (let veg of validVegetationTypeOptions) {
      const vegGroup = vegetationGroupMapping[veg];
      if (!vegGroup) continue; // Skip invalid vegetation types
      for (let age of standAgeOptions) {
        allCombinations.push({ geo, forest, veg: vegGroup, age });
      }
    }
  }
}

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

      const enrichedData = data.map((entry) => {
        const genus = entry.Genus;
        const svampGruppSlakte = genusToSvampGrupp[genus] || "Saknas";
        return {
          ...entry,
          "Svamp-grupp-släkte": svampGruppSlakte,
        };
      });

      const safeVegGroup = veg.replace("/", "");
      const filename = `data-${geo}-${forest}-${age}-${safeVegGroup}.json`;
      const filePath = path.join(__dirname, `../static/${filename}`);

      fs.writeFileSync(filePath, JSON.stringify(enrichedData, null, 2));
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

// Assuming allCombinations is already defined as in your script
async function generateValidCombinations() {
  let validCombinations = [];
  for (const { geo, forest, veg, age } of allCombinations) {
    const safeVeg = veg.replace("/", ""); // Normalize the vegetation type here
    try {
      const data = await fetchDataDirectly({
        geography: geo,
        forestType: forest,
        vegetationType: veg,
        standAge: age,
      });
      if (data && data.length > 0) {
        validCombinations.push({ geo, forest, veg: safeVeg, age }); // Store using normalized veg
      }
    } catch (error) {
      console.error(
        `Failed to fetch data for combination ${geo}, ${forest}, ${veg}, ${age}: ${error}`
      );
    }
  }
  fs.writeFileSync(
    path.join(__dirname, "validCombinations.json"),
    JSON.stringify(validCombinations)
  );
  console.log("Valid combinations have been saved.");
}
generateValidCombinations();
