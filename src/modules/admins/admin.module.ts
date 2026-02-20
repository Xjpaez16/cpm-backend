import { Module } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma.service';
import { LoginAdminUseCase } from './applications/login-admin.use-case';
import { PrismaAdminRepository } from './infraestructure/persistence/prisma-admins.repository';
import { AdminController } from './presentation/admin.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [AuthModule],
    controllers: [AdminController],
    providers: [
        PrismaService,
        LoginAdminUseCase,
        {
            provide: 'IAdminRepository',
            useClass: PrismaAdminRepository,
        },
    ],
    exports: [LoginAdminUseCase],
})
export class AdminModule { }
