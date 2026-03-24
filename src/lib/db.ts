import { Pool } from "pg";

declare global {
  var __bibleMemoryPool: Pool | undefined;
}

export function getDbPool() {
  if (!process.env.DATABASE_URL) {
    return null;
  }

  if (!global.__bibleMemoryPool) {
    global.__bibleMemoryPool = new Pool({
      connectionString: process.env.DATABASE_URL
    });
  }

  return global.__bibleMemoryPool;
}

