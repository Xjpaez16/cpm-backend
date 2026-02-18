import { Module } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma.service';
import { PrismaClientRepository } from './infraestructure/persistence/prisma-clients.repository';
import { GetClientsUseCase } from './applications/get-clients.use-case';
import { UpdateClientUseCase } from './applications/update-client.use-case';
import { CreateClientUseCase } from './applications/create-client.use-case';
import { ToggleClientStatusUseCase } from './applications/toggle-client-status.use-case';
import { ClientController } from './presentation/client.controller';


@Module({
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
        ToggleClientStatusUseCase,
    ],
})
export class ClientModule { }
