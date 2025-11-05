import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

const connectionString = process.env.DATABASE_URL ?? 'mysql://root:root@localhost:3306/nextimob';

export default defineConfig({
  dialect: 'mysql',
  schema: './drizzle/schema.ts',
  out: './drizzle/migrations',
  dbCredentials: {
    connectionString,
  },
  strict: true,
  verbose: true,
});
