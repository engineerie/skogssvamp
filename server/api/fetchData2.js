import sqlite3 from "sqlite3";
import { open } from "sqlite";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Fix for __dirname not being defined in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fetchDataFromDB = async ({
  geography,
  forestType,
  vegetationType,
  standAge,
}) => {
  const db = await open({
    filename: "./server/EDNAData.db",
    driver: sqlite3.Database,
  });

  // Modify the SQL condition for stand age
  let ageCondition = "";
  if (standAge === "allaåldrar") {
    ageCondition = "1=1"; // Always true, does not filter by age
  } else if (standAge === "91") {
    ageCondition = "m.Bestandsalder >= 91";
  } else {
    const ageRange = standAge.split("-");
    ageCondition = `m.Bestandsalder BETWEEN ${ageRange[0]} AND ${
      ageRange[1] || 999
    }`;
  }

  // Define forest type condition based on input
  let forestTypeCondition = "";
  switch (forestType) {
    case "Granskog":
      forestTypeCondition = "m.Marktyp = 'Granskog'";
      break;
    case "Tallskog":
      forestTypeCondition = "m.Marktyp = 'Tallskog'";
      break;
    case "Barrblandskog":
      forestTypeCondition =
        "(m.Marktyp IN ('Barrblandskog', 'Fjällbarrskog') OR (m.Marktyp = 'Hygge' AND m.H_form IN ('Mår typ 1', 'Mår typ 2')))";
      break;
    case "Lövblandskog":
      forestTypeCondition =
        "(m.Marktyp = 'Blandskog' OR (m.Marktyp = 'Hygge' AND m.H_form = 'Mull'))";
      break;
    case "Lövskog":
      forestTypeCondition = "m.Marktyp IN ('Björkskog', 'Övrig lövskog')";
      break;
    case "Naturbete":
      forestTypeCondition = "m.Marktyp = 'Naturbete'";
      break;
    case "EkBokskog":
      forestTypeCondition = "m.Marktyp = 'Ek/Bokskog'";
      break;
    default:
      forestTypeCondition = "1=1"; // This will always be true, effectively ignoring this filter if no valid type is provided
  }
  // Ensure all identifiers, especially table names with special characters, are correctly quoted
  const query = `
    SELECT 
      mcv.SpeciesCode,
      sd.Taxon_sp AS taxon,
      COALESCE(ms.Commonname, 'Saknar svenskt namn') AS snamn,
      CASE WHEN ms."Nya svamp-boken" = 'x' THEN 1 ELSE 0 END AS matsvamp,
      SUM(mcv.Presence) AS total_presence,
      COALESCE(ms.Artfakta, 'Information saknas') AS Artfakta,
      COALESCE(ms.RL2020kat, '0') AS RL2020kat,
      COALESCE(ms."Svamp-grupp", '0') AS "Svamp-grupp",
      COALESCE(ms."Svamp-Undersvamp-grupp", '0') AS "Svamp-Undersvamp-grupp",
      COALESCE(ms.SIGNAL_art, '0') AS "SIGNAL_art",
      COALESCE(ms.Svampguiden, '0') AS Svampguiden,
      COALESCE(ms."Nya svamp-boken", '0') AS "Nya svamp-boken",
      COALESCE(sd.Genus, 'Information saknas') AS Genus,
      COUNT(DISTINCT m.GropInventeringID) AS sample_plot_count,
      (
        SELECT COUNT(DISTINCT m1.GropInventeringID) 
        FROM Metadata m1
        WHERE 
          m1.lat ${geography === "Norr" ? ">=" : "<"} 60 AND
  ${ageCondition.replace("m.", "m1.")} AND
          ${forestTypeCondition.replace("m.", "m1.")} AND
          m1.Fältskikt = '${vegetationType}'
      ) AS sample_env_count
    FROM 
      Melted_counts_vs_samples_ECM mcv
    LEFT JOIN 
      Metadata m ON mcv.GropInventeringID = m.GropInventeringID
    LEFT JOIN 
      Species_database sd ON mcv.SpeciesCode = sd."ID#"
    LEFT JOIN 
      "2024_matsvamp_rödlista_svampgrupp_2_april" ms ON sd.Taxon = ms.Scientificname
    WHERE 
    m.lat ${geography === "Norr" ? ">=" : "<"} 60
    AND ${ageCondition}
    AND ${forestTypeCondition}
    AND m.Fältskikt = '${vegetationType}'
  GROUP BY 
    mcv.SpeciesCode, sd.Taxon_sp
  ORDER BY 
    sd.Taxon_sp
`;

  console.log("Executing SQL Query:");
  console.log(query);

  try {
    const data = await db.all(query);
    console.log("Query Result:");
    console.log(data);

    // Log the total number of species retrieved
    console.log(`Total species retrieved: ${data.length}`);

    const logFilePath = path.join(__dirname, "query_result_log.json");
    fs.writeFileSync(logFilePath, JSON.stringify(data, null, 2));
    console.log(`Results written to ${logFilePath}`);

    await db.close();
    return data.map((row) => ({
      ...row,
      total_presence: Number(row.total_presence),
    }));
  } catch (error) {
    console.error("Error executing query:", error.message);
    await db.close();
    throw error;
  }
};

export async function fetchDataDirectly({
  geography,
  forestType,
  vegetationType,
  standAge,
}) {
  return fetchDataFromDB({ geography, forestType, vegetationType, standAge });
}

export default fetchDataDirectly;
