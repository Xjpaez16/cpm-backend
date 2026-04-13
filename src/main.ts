import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { PrismaService } from './core/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.enableCors({
    origin: '*', // For development. Change to specific domain in production.
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe(
    {
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }
  ));

  // Bootstrap: Fix admin passwords if not hashed
  const prisma = app.get(PrismaService); // Get the existing service
  const bcrypt = require('bcrypt');
  const admins = await prisma.admin.findMany();
  for (const admin of admins) {
    if (!admin.password.startsWith('$2b$') && !admin.password.startsWith('$2a$')) {
      const hash = await bcrypt.hash(admin.password, 10);
      await prisma.admin.update({ where: { id: admin.id }, data: { password: hash } });
      console.log(`Hashed password for admin ${admin.username}`);
    }
  }

  await app.listen(process.env.PORT ?? 3000);

}
bootstrap();
