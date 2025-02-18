import { fetchDataDirectly } from "../server/api/fetchData2.js";
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
  "EkBokskog",
  "Naturbete",
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

// Helper: Compute image URLs for a given scientific name using the manifest
async function computeImages(scientificName, manifest) {
  if (!scientificName) return [];
  const cleanedName = scientificName
    .replace(/\s*s\.?\s*(lat\.?|str\.?)\s*$/i, "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

  const foundImages = [];
  const searchFolders = ["Matsvampar", "Giftsvampar", "RödlistadeSvampar"];
  for (const folder of searchFolders) {
    const files = manifest[folder] || [];
    for (const file of files) {
      // Remove file extension and split out the name part
      const base = file.replace(/\.(jpg|jpeg|png|webp)$/i, "");
      const [namePart] = base.split("-", 1);
      const cleanedNamePart = namePart
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();
      // If the name includes a comma, compare both parts
      if (cleanedNamePart.includes(",")) {
        const [nameA, nameB] = cleanedNamePart.split(",").map((s) => s.trim());
        if (nameA === cleanedName || nameB === cleanedName) {
          foundImages.push(`/images/SvampBilder/${folder}/${file}`);
        }
      } else if (cleanedNamePart === cleanedName) {
        foundImages.push(`/images/SvampBilder/${folder}/${file}`);
      }
    }
  }
  return foundImages;
}

// Mapping of genera to their corresponding svamp-grupp values
const genusToSvampGrupp = {
  Acephala: "övrigt",
  Alpova: "tryffel",
  Amanita: "hattsvamp",
  Amphinema: "skinnsvamp",
  Boletus: "sopp",
  Byssocorticium: "skinnsvamp",
  Calonarius: "hattsvamp",
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
  Genabea: "tryffel",
  Genea: "tryffel",
  Geopora: "tryffel",
  Gomphidius: "hattsvamp",
  Gyrodon: "sopp",
  Hebeloma: "hattsvamp",
  Helvellosebacina: "övrigt",
  Humaria: "skålsvamp",
  Hyaloscypha: "skålsvamp",
  Hydnellum: "taggsvamp",
  Hydnotrya: "tryffel",
  Hydnum: "taggsvamp",
  Hygronarius: "hattsvamp",
  Hygrophorus: "hattsvamp",
  Hymenogaster: "tryffel",
  Hysterangium: "tryffel",
  Imleria: "sopp",
  Inocybe: "hattsvamp",
  Inosperma: "hattsvamp",
  Laccaria: "hattsvamp",
  Lactarius: "hattsvamp",
  Lactifluus: "hattsvamp",
  Leccinum: "sopp",
  Melanogaster: "tryffel",
  Naucoria: "hattsvamp",
  Otidea: "skålsvamp",
  Paxillus: "hattsvamp",
  Phaeocollybia: "hattsvamp",
  Phellodon: "taggsvamp",
  Phlegmacium: "hattsvamp",
  Piloderma: "skinnsvamp",
  Polyozellus: "skinnsvamp",
  Pseudosperma: "hattsvamp",
  Pseudotomentella: "skinnsvamp",
  Ramaria: "fingersvamp",
  Rhizopogon: "tryffel",
  Russula: "hattsvamp",
  Sarcodon: "taggsvamp",
  Scleroderma: "tryffel",
  Sebacina: "övrigt",
  Serendipita: "övrigt",
  Sistotrema: "skinnsvamp",
  Sistotremella: "skinnsvamp",
  Suillus: "sopp",
  Sutorius: "sopp",
  Tarzetta: "skålsvamp",
  Thaxterogaster: "hattsvamp",
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

// Mapping of taxon to SvampGrupp (fallback if genus mapping fails)
const taxonToSvampGrupp = {
  Albatrellaceae: "övrigt",
  Atheliaceae: "skinnsvamp",
  Cantharellales: "övrigt",
  Eurotiomycetes: "övrigt",
  Hydnaceae: "övrigt",
  Pyronemataceae: "skålsvamp",
  Thelephoraceae: "skinnsvamp",
};

// Function to clean taxon and remove "sp.1", "sp.2", etc.
function cleanTaxon(Scientificname) {
  if (!Scientificname) return null;
  // Regex to remove " sp.X" (e.g., "sp.1", "sp.2") from taxon
  return Scientificname.replace(/ sp\.\d+$/, "").trim();
}

// Function to log data
function logToFile(data) {
  const logFilePath = path.join(__dirname, "app.log");
  fs.appendFileSync(logFilePath, data + "\n", { encoding: "utf8" });
}

async function prefetchData() {
  // Read the manifest file directly from disk
  const manifestPath = path.join(
    __dirname,
    "../public/imagemanifest/manifest.json"
  );
  let manifest = {};
  try {
    const manifestData = fs.readFileSync(manifestPath, "utf8");
    manifest = JSON.parse(manifestData);
  } catch (error) {
    console.error("Error reading manifest file:", error);
  }

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

      // First, enrich the raw data by adding 'Svamp-grupp-släkte'
      const enrichedData = data.map((entry) => {
        const genus = entry.Genus;
        const rawTaxon = entry.Scientificname;
        const cleanedTaxon = cleanTaxon(rawTaxon); // Clean the taxon

        // Decide Svamp-grupp-släkte
        let svampGruppSlakte = genusToSvampGrupp[genus]; // Try to assign based on genus

        if (!svampGruppSlakte && cleanedTaxon) {
          // Fallback to taxon-based assignment if genus is null or not in the mapping
          svampGruppSlakte = taxonToSvampGrupp[cleanedTaxon] || "Saknas";
        }

        return {
          ...entry,
          "Svamp-grupp-släkte": svampGruppSlakte, // Add the determined Svamp-grupp-släkte
        };
      });

      // Now add the computed image URLs to each entry
      const enrichedDataWithImages = await Promise.all(
        enrichedData.map(async (entry) => {
          const images = await computeImages(entry.Scientificname, manifest);
          return { ...entry, images };
        })
      );

      const safeVegGroupName = vegGroupName.replace(/\//g, ""); // Remove slashes
      const filename = `data-${geo}-${forest}-${age}-${safeVegGroupName}.json`;
      const filePath = path.join(__dirname, `../static/${filename}`);

      fs.writeFileSync(
        filePath,
        JSON.stringify(enrichedDataWithImages, null, 2)
      );
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

// Generate valid combinations and save to a file
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
        vegetationTypes: vegGroupList,
        standAge: age,
      });
      if (data && data.length > 0) {
        validCombinations.push({ geo, forest, veg: safeVegGroupName, age });
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
