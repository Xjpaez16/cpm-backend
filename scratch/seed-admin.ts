import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env') });

async function main() {
  // Prisma 7.x loads env automatically or expects it in process.env
  const prisma = new PrismaClient();

  const adminEmail = 'admin@acpm.com';
  const adminPassword = 'admin123';
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const existingAdmin = await prisma.admin.findUnique({
    where: { email: adminEmail }
  });

  if (!existingAdmin) {
    await prisma.admin.create({
      data: {
        username: 'admin',
        email: adminEmail,
        password: hashedPassword,
        isActive: true
      }
    });
    console.log('Default admin created: admin@acpm.com / admin123');
  } else {
    console.log('Admin already exists.');
    // Update password just in case it was different
    await prisma.admin.update({
        where: { email: adminEmail },
        data: { password: hashedPassword }
    });
    console.log('Admin password reset to: admin123');
  }

  await prisma.$disconnect();
}

main().catch(console.error);
