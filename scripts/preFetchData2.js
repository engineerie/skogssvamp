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
const vegetationGroups = {
  Örter_grupp: ["Högört", "Lågört", "Bredblad gräs"],
  Blåbär_grupp: ["Blåbär", "Smalblad gräs"],
  Lingon_grupp: ["Lingon", "Kråkbär/Ljung"],
};
const standAgeOptions = ["1-40", "41-90", "91", "allaåldrar"];
let allCombinations = [];

for (let geo of geographyOptions) {
  for (let forest of forestTypeOptions) {
    for (let vegGroupName in vegetationGroups) {
      const vegGroupList = vegetationGroups[vegGroupName];
      for (let age of standAgeOptions) {
        allCombinations.push({ geo, forest, vegGroupName, vegGroupList, age });
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
  for (const {
    geo,
    forest,
    vegGroupName,
    vegGroupList,
    age,
  } of allCombinations) {
    const startMessage = `Starting fetch for combination: geo=${geo}, forest=${forest}, vegGroup=${vegGroupName}, age=${age}`;
    console.log(startMessage);
    logToFile(startMessage); // Log to file

    try {
      const data = await fetchDataDirectly({
        geography: geo,
        forestType: forest,
        vegetationTypes: vegGroupList, // Pass the array of vegetation types
        standAge: age,
      });

      const fetchCompleteMessage = `Fetch complete for combination: geo=${geo}, forest=${forest}, vegGroup=${vegGroupName}, age=${age}`;
      console.log(fetchCompleteMessage);
      logToFile(fetchCompleteMessage); // Log to file

      console.log(`Fetched data length: ${data.length}`);
      logToFile(`Fetched data length: ${data.length}`); // Log to file

      if (!data || data.length === 0) {
        const noDataMessage = `No data fetched for combination: geo=${geo}, forest=${forest}, vegGroup=${vegGroupName}, age=${age}`;
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

      const safeVegGroupName = vegGroupName.replace(/\//g, ""); // Remove slashes
      const filename = `data-${geo}-${forest}-${age}-${safeVegGroupName}.json`;
      const filePath = path.join(__dirname, `../static/${filename}`);

      fs.writeFileSync(filePath, JSON.stringify(enrichedData, null, 2));
      const writtenMessage = `Data written to ${filePath}. File size: ${
        fs.statSync(filePath).size
      } bytes`;
      console.log(writtenMessage);
      logToFile(writtenMessage); // Log to file
    } catch (error) {
      const errorMessage = `Error during data fetch for combination: geo=${geo}, forest=${forest}, vegGroup=${vegGroupName}, age=${age}: ${error}`;
      console.error(errorMessage);
      logToFile(errorMessage); // Log to file
    }
  }
}

prefetchData();

// Assuming allCombinations is already defined as in your script
async function generateValidCombinations() {
  let validCombinations = [];
  for (const {
    geo,
    forest,
    vegGroupName,
    vegGroupList,
    age,
  } of allCombinations) {
    const safeVegGroupName = vegGroupName.replace(/\//g, ""); // Normalize the vegetation group name
    try {
      const data = await fetchDataDirectly({
        geography: geo,
        forestType: forest,
        vegetationTypes: vegGroupList, // Pass the array of vegetation types
        standAge: age,
      });
      if (data && data.length > 0) {
        validCombinations.push({ geo, forest, veg: safeVegGroupName, age }); // Store using normalized veg group name
      }
    } catch (error) {
      console.error(
        `Failed to fetch data for combination ${geo}, ${forest}, ${vegGroupName}, ${age}: ${error}`
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
