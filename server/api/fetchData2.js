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

  // Define forest type condition based on input
  let forestTypeCondition = `m.Marktyp = '${forestType}'`;
  if (forestType === "Lövblandskog") {
    forestTypeCondition =
      "m.Marktyp IN ('Björkskog', 'Ek/bokskog', 'Övrig lövskog')";
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
          m1.Bestandsalder ${standAge === "91" ? ">=" : "BETWEEN"} ${
    standAge.split("-")[0]
  } AND ${standAge.split("-")[1] || 999} AND
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
      AND m.Bestandsalder ${standAge === "91" ? ">=" : "BETWEEN"} ${
    standAge.split("-")[0]
  } AND ${standAge.split("-")[1] || 999}
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
