// server/api/edibleFetchData.js

import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const fetchEdibleDataFromDB = async ({ geography, forestType, vegetationType, standAge }) => {
  const db = await open({
    filename: './server/EDNAData.db',
    driver: sqlite3.Database
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
    m."Nya svamp-boken",
    m."Norra Sverige",
    m."Södra Sverige",
    m.Gran,
    m.Tall,
    m."Blandad barrskog",
    m."Blandad lövskog",
    m."11-20 år",
    m."1-40 år",
    m."41-90 år",
    m."91 år och äldre",
    m.högört,
    m.lågört,
    m."bredbladigt gräs",
    m."smalbladigt gräs",
    m.blåbär,
    m.lingon,
    m."kråkbär ljung",
    s.rating,
    s.ekologi
  FROM 
    "2024_matsvamp_rödlista_svampgrupp_2_april" m
  LEFT JOIN svampguiden s ON m.taxon = s.taxonid
  WHERE 
    m."Nya svamp-boken" IS NOT NULL
  `;

  const data = await db.all(query);

  await db.close();

  return data;
};

export async function fetchEdibleDataDirectly({ geography, forestType, vegetationType, standAge }) {
  return fetchEdibleDataFromDB({ geography, forestType, vegetationType, standAge });
}

export default fetchEdibleDataDirectly;
