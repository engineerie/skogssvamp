// server/api/edibleFetchData.js

import sqlite3 from "sqlite3";
import { open } from "sqlite";

const fetchEdibleDataFromDB = async ({
  geography,
  forestType,
  vegetationType,
  standAge,
}) => {
  const db = await open({
    filename: "./server/EDNAData.db",
    driver: sqlite3.Database,
  });

  // Updated query with additional WHERE conditions
  const query = `
  SELECT 
    m.Scientificname,
    m.Commonname,
    m.Artfakta,
    m.RL2020kat,
    m.RL2020krit,
    m.Kriteriedokumentation,
    m."Svamp-grupp",
    m."Svamp-Undersvamp-grupp",
    m."SIGNAL_art",
    m.Svampguiden,
    m."Nyasvamp-boken",
    m."Norra Sverige",
    m."Södra Sverige",
    m.Gran,
    m.Tall,
    m."Blandad barrskog",
    m."Blandad lövskog",
    m.Lövskog,
    m.EkochBokskog,
    m.Naturbete,
    m."11-20 år",
    m."1-40 år",
    m."41-90 år",
    m."91 år och äldre",
    m."ÖRTER_grupp",
    m."BLÅBÄR_grupp",
    m."LINGON_grupp",
    s.rating,
    s.ekologi
  FROM 
    "Svampen_oktober_18" m
  LEFT JOIN svampguiden s ON m.taxon = s.taxonid
  WHERE 
    m."Nyasvamp-boken" IS NOT NULL
  `;

  const data = await db.all(query);

  await db.close();

  return data;
};

export async function fetchEdibleDataDirectly({
  geography,
  forestType,
  vegetationType,
  standAge,
}) {
  return fetchEdibleDataFromDB({
    geography,
    forestType,
    vegetationType,
    standAge,
  });
}

export default fetchEdibleDataDirectly;
