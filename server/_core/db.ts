import 'dotenv/config';
import mysql from 'mysql2/promise';
import { drizzle } from 'drizzle-orm/mysql2';

type DrizzleClient = ReturnType<typeof drizzle>;

let client: DrizzleClient | null = null;

function resolveConnectionString() {
  return (
    process.env.DATABASE_URL ??
    'mysql://root:root@localhost:3306/nextimob'
  );
}

export function getDb(): DrizzleClient {
  if (client) {
    return client;
  }

  const connectionString = resolveConnectionString();
  const pool = mysql.createPool(connectionString);
  client = drizzle(pool);
  return client;
}
