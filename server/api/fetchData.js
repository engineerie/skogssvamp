import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { defineEventHandler } from 'h3';

const fetchDataFromDB = async () => {
  const db = await open({
    filename: './server/EDNAData.db',  // Make sure this path is correct
    driver: sqlite3.Database
  });

  const data = await db.all('SELECT skogstyp_se FROM app_metadata LIMIT 5');  

  await db.close();

  return data;
};

export default defineEventHandler(async (event) => {
  if (event.node.req.method === 'POST') {
    const data = await fetchDataFromDB();
    return { data };
  } else {
    return { status: 405, error: 'Method not allowed' };
  }
});
