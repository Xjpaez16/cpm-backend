import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {

   constructor() {
    // 1. Creamos una "piscina" (pool) de conexiones con la URL del .env
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    
    // 2. Creamos el adaptador para que Prisma se comunique con PostgreSQL
    const adapter = new PrismaPg(pool);

    // 3. Le pasamos el adaptador al constructor de Prisma
    super({ adapter });
  }

  async onModuleInit() {
    
    try {
      
      await this.$connect();
      console.log('Conexión a Neon establecida correctamente');
    } catch (error) {
      console.error('Error al conectar a Neon. Revisa tu DATABASE_URL en el .env');
      console.error(error);
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}