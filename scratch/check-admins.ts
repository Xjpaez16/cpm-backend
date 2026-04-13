import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env') });

async function main() {
  const prisma = new PrismaClient();
  const admins = await prisma.admin.findMany();
  console.log('Admins in DB:', JSON.stringify(admins, null, 2));
  await prisma.$disconnect();
}

main().catch(console.error);
