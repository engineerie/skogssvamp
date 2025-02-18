// checkMissingImagesSimplified.js

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Import your fetch functions (adjust the paths if necessary)
import { fetchEdibleDataDirectly as fetchEdibleData } from "../server/api/edibleFetchData.js";
import { fetchEdibleDataDirectly as fetchRedData } from "../server/api/redFetchData.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load the image manifest
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
  process.exit(1);
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
      const base = file.replace(/\.(jpg|jpeg|png|webp)$/i, "");
      const [namePart] = base.split("-", 1);
      const cleanedNamePart = namePart
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();
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

// Fetch species data, combine, and filter out those with images
async function checkSpeciesWithoutImages() {
  // Pass dummy parameters since your API ignores them
  const edibleSpecies = await fetchEdibleData({
    geo: "",
    forest: "",
    veg: "",
    age: "",
  });
  const redSpecies = await fetchRedData({
    geo: "",
    forest: "",
    veg: "",
    age: "",
  });

  // Combine species into a Map keyed by Scientificname to avoid duplicates
  const speciesMap = new Map();
  const addSpecies = (speciesList) => {
    speciesList.forEach((s) => {
      if (s.Scientificname && !speciesMap.has(s.Scientificname)) {
        speciesMap.set(s.Scientificname, s);
      }
    });
  };
  addSpecies(edibleSpecies);
  addSpecies(redSpecies);

  // Filter species that have no images
  const speciesWithoutImages = [];
  for (const [scientificName, species] of speciesMap.entries()) {
    const images = await computeImages(scientificName, manifest);
    if (images.length === 0) {
      speciesWithoutImages.push(species);
    }
  }
  return speciesWithoutImages;
}

// Convert the simplified list to CSV format
function convertToCSV(data) {
  // Define the desired columns
  const headers = [
    "Scientificname",
    "Commonname",
    "SIGNAL_art",
    "RL2020kat",
    "Giftsvamp",
    "Nyasvamp-boken",
  ];
  const csvRows = [];
  // Add header row
  csvRows.push(headers.join(","));
  // Add each data row, ensuring proper CSV escaping
  for (const item of data) {
    const row = headers
      .map((header) => {
        let cell = item[header] != null ? item[header].toString() : "";
        // If the cell contains commas or quotes, wrap it in quotes and escape inner quotes
        if (cell.includes(",") || cell.includes('"')) {
          cell = '"' + cell.replace(/"/g, '""') + '"';
        }
        return cell;
      })
      .join(",");
    csvRows.push(row);
  }
  return csvRows.join("\n");
}

// Main execution function
(async () => {
  try {
    const speciesWithoutImages = await checkSpeciesWithoutImages();
    // Simplify each species to only include the desired fields
    const simplified = speciesWithoutImages.map((item) => ({
      Scientificname: item.Scientificname,
      Commonname: item.Commonname,
      SIGNAL_art: item.SIGNAL_art,
      RL2020kat: item.RL2020kat,
      Giftsvamp: item.Giftsvamp,
      "Nyasvamp-boken": item["Nyasvamp-boken"],
    }));

    const csvContent = convertToCSV(simplified);
    const outputPath = path.join(__dirname, "speciesWithoutImages.csv");
    fs.writeFileSync(outputPath, csvContent);
    console.log(`CSV file generated at: ${outputPath}`);
  } catch (error) {
    console.error("Error checking species without images:", error);
  }
})();
