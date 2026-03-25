import mysql, { type Pool } from "mysql2/promise";

declare global {
  var __bibleMemoryPool: Pool | undefined;
}

export function getDbPool() {
  const connectionUri = process.env.MYSQL_URL ?? process.env.DATABASE_URL;

  if (!connectionUri) {
    return null;
  }

  if (!global.__bibleMemoryPool) {
    global.__bibleMemoryPool = mysql.createPool({
      uri: connectionUri,
      connectionLimit: 10
    });
  }

  return global.__bibleMemoryPool;
}
