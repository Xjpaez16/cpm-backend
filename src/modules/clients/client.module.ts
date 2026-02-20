import { Module } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma.service';
import { PrismaClientRepository } from './infraestructure/persistence/prisma-clients.repository';
import { GetClientsUseCase } from './applications/get-clients.use-case';
import { UpdateClientUseCase } from './applications/update-client.use-case';
import { CreateClientUseCase } from './applications/create-client.use-case';
import { ToggleClientStatusUseCase } from './applications/toggle-client-status.use-case';
import { LoginClientUseCase } from './applications/login-client.use-case';
import { ClientController } from './presentation/client.controller';
import { ForgotPasswordUseCase } from './applications/forgot-password.use-case';
import { ResetPasswordUseCase } from './applications/reset-password.use-case';
import { MailModule } from '../mail/mail.module';
import { AuthModule } from '../auth/auth.module';


@Module({
    imports: [MailModule, AuthModule],
    controllers: [ClientController],
    providers: [
        PrismaService,
        {
            provide: 'IClientRepository',
            useClass: PrismaClientRepository,
        },
        GetClientsUseCase,
        UpdateClientUseCase,
        CreateClientUseCase,
        LoginClientUseCase,
        ToggleClientStatusUseCase,
        ForgotPasswordUseCase,
        ResetPasswordUseCase,
    ],
    exports: ['IClientRepository'],
})
export class ClientModule { }
