import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { drizzle } from 'drizzle-orm/mysql2';
import { eq } from 'drizzle-orm';
import mysql from 'mysql2/promise';

import { users } from '../../drizzle/schema';

const connectionString = process.env.DATABASE_URL ?? 'mysql://root:root@localhost:3306/nextimob';

async function seed() {
  const connection = await mysql.createConnection(connectionString);
  const db = drizzle(connection);

  const adminEmail = process.env.ADMIN_EMAIL ?? 'admin@nextimob.com';
  const adminName = process.env.ADMIN_NAME ?? 'NextImob Admin';
  const adminPassword = process.env.ADMIN_PASSWORD ?? 'changeMeNow!';

  const [existing] = await db
    .select()
    .from(users)
    .where(eq(users.email, adminEmail))
    .limit(1);

  if (existing) {
    console.info(`Admin user already exists for email ${adminEmail}`);
    await connection.end();
    return;
  }

  const passwordHash = await bcrypt.hash(adminPassword, 12);

  await db.insert(users).values({
    name: adminName,
    email: adminEmail,
    passwordHash,
    provider: 'LOCAL',
    role: 'ADMIN',
  });

  console.info(`Admin user created with email ${adminEmail}`);
  await connection.end();
}

seed().catch((error) => {
  console.error('Failed to run seed script:', error);
  process.exitCode = 1;
});
