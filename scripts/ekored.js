#!/usr/bin/env node
import fs from "fs";
import path from "path";

// Import your fetch functions from the server API.
import { fetchEdibleDataDirectly as fetchEdibleData } from "../server/api/edibleFetchData.js";
import { fetchEdibleDataDirectly as fetchRedData } from "../server/api/redFetchData.js";

async function exportSpeciesCSV() {
  try {
    // Fetch data from both sources.
    // We pass dummy parameters here since the queries don't really use them.
    const edibleData = await fetchEdibleData({
      geography: "",
      forestType: "",
      vegetationType: "",
      standAge: "",
    });
    const redData = await fetchRedData({
      geography: "",
      forestType: "",
      vegetationType: "",
      standAge: "",
    });

    // Combine the two datasets, deduplicating by Scientificname.
    const speciesMap = new Map();
    edibleData.forEach((sp) => {
      if (sp.Scientificname && !speciesMap.has(sp.Scientificname)) {
        speciesMap.set(sp.Scientificname, sp);
      }
    });
    redData.forEach((sp) => {
      if (sp.Scientificname && !speciesMap.has(sp.Scientificname)) {
        speciesMap.set(sp.Scientificname, sp);
      }
    });
    const combinedSpecies = Array.from(speciesMap.values());

    // Define the desired CSV columns.
    const headers = [
      "Scientificname",
      "Commonname",
      "SIGNAL_art",
      "RL2020kat",
      "Giftsvamp",
      "Nyasvamp-boken",
      "ekologi",
      "Kriteriedokumentation",
    ];

    // Helper: Escape CSV fields if necessary.
    function csvEscape(field) {
      if (field == null) return "";
      const str = String(field);
      if (str.includes('"') || str.includes(",") || str.includes("\n")) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    }

    // Build CSV content.
    let csvContent = headers.map(csvEscape).join(",") + "\n";
    combinedSpecies.forEach((sp) => {
      const row = headers.map((header) => csvEscape(sp[header]));
      csvContent += row.join(",") + "\n";
    });

    // Write CSV to file. Adjust the output folder as needed.
    const outputFile = path.join(process.cwd(), "static", "species_export.csv");
    fs.writeFileSync(outputFile, csvContent, "utf8");
    console.log(`CSV export complete. File written to ${outputFile}`);
  } catch (error) {
    console.error("Error during CSV export:", error);
  }
}

exportSpeciesCSV();
