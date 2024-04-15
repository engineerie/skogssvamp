import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { defineEventHandler } from "h3";
import { URL } from "url"; // Import Node's native URL module

// This function is used for both direct fetching and handling HTTP requests
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

  const data = await db.all(
    `
  SELECT 
    app_taxonomy.taxon, 
    IFNULL(app_taxonomy_dyntaxa.snamn, 'Saknar svenskt namn') AS snamn,
    app_taxonomy_dyntaxa.matsvamp,
    SUM(app_abundance.presence) AS total_presence,
    COALESCE(r.Artfakta, 'Information saknas') AS Artfakta,
    COALESCE(r.RL2020kat, '0') AS RL2020kat,
    COALESCE(r."Svamp-grupp", '0') AS "Svamp-grupp",
    COALESCE(r."Svamp-Undersvamp-grupp", '0') AS "Svamp-Undersvamp-grupp",
    COALESCE(r."Signal_art", '0') AS "Signal_art",
    COALESCE(r.Svampguiden, '0') AS Svampguiden
  FROM 
    app_metadata
  JOIN 
    app_abundance ON app_metadata.lims = app_abundance.lims
  JOIN 
    app_taxonomy ON app_abundance.clusterid = app_taxonomy.clusterid
  JOIN 
    app_taxonomy_dyntaxa ON app_taxonomy.taxon_gbif_name = app_taxonomy_dyntaxa.taxon
  JOIN 
    "SI18 & SI19-Table 1" ON app_taxonomy_dyntaxa.taxon = "SI18 & SI19-Table 1".taxon
  LEFT JOIN 
    "2024_matsvamp_rödlista_svampgrupp_2_april" r ON app_taxonomy.taxon = r.Scientificname
  WHERE 
    "SI18 & SI19-Table 1".Lifeform = 'ECM'
  AND 
    ( (app_metadata.latitud > 60 AND ? = ?) OR 
      (app_metadata.latitud <= 60 AND ? = ?) )
  AND 
    ( (app_metadata.bestandsalder BETWEEN 1 AND 40 AND ? = ?) OR
      (app_metadata.bestandsalder BETWEEN 41 AND 90 AND ? = ?) OR
      (app_metadata.bestandsalder > 90 AND ? = ?) )
  AND 
    app_metadata.vegtyp = ? 
  AND 
    app_metadata.skogstyp = ?
  GROUP BY 
    app_taxonomy.taxon, app_taxonomy_dyntaxa.snamn, app_taxonomy_dyntaxa.matsvamp  
  ORDER BY 
    total_presence DESC;
`,
    [
      geography,
      "North Sweden",
      geography,
      "South Sweden",
      standAge,
      "1-40 years",
      standAge,
      "41-90 years",
      standAge,
      "91< years",
      vegetationType,
      forestType,
    ]
  );

  await db.close();
  return data;
};

export async function fetchDataDirectly({
  geography,
  forestType,
  vegetationType,
  standAge,
}) {
  // Call fetchDataFromDB and return the data
  const data = await fetchDataFromDB({
    geography,
    forestType,
    vegetationType,
    standAge,
  });
  return data;
}

const forestTypeMap = {
  Pine: 1,
  Spruce: 2,
  "Mixed Deciduous": 3,
  "Mixed Coniferous": 4,
};

const vegetationTypeMap = {
  "Tall herbs": 1,
  "Low herbs": 2,
  "No field layer": 3,
  "Broad grasses": 4,
  "Narrow grasses": 5,
  Blueberry: 6,
  Lingonberry: 7,
  "Crowberry/heather": 8,
};

export default defineEventHandler(async (event) => {
  console.log("Full event object:", event);
  console.log("Backend request URL:", event.node.req.url);

  // Manually parse the URL to get query parameters
  const myURL = new URL(
    event.node.req.url,
    `http://${event.node.req.headers.host}`
  );
  const reqQuery = Object.fromEntries(myURL.searchParams);

  console.log("Manually parsed query:", reqQuery);

  if (!reqQuery) {
    return { error: "Query parameters are missing", status: 400 };
  }

  const {
    geography,
    forestType: forestTypeStr,
    vegetationType: vegetationTypeStr,
    standAge,
  } = reqQuery;

  const forestType = forestTypeMap[forestTypeStr];
  const vegetationType = vegetationTypeMap[vegetationTypeStr];

  const data = await fetchDataFromDB({
    geography,
    forestType,
    vegetationType,
    standAge,
  });

  return { data };
});
