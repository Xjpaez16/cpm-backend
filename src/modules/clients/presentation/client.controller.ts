import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UpdateClientUseCase } from '../applications/update-client.use-case';
import { UpdateClientDto } from './dto/update-client.dto';
import { GetClientsUseCase } from '../applications/get-clients.use-case';
import { CreateClientUseCase } from '../applications/create-client.use-case';
import { CreateClientDto } from './dto/create-client.dto';
import { ToggleClientStatusUseCase } from '../applications/toggle-client-status.use-case';

@Controller('clients')
export class ClientController {
    constructor(
        private readonly updateClientUseCase: UpdateClientUseCase,
        private readonly getClientsUseCase: GetClientsUseCase,
        private readonly createClientUseCase: CreateClientUseCase,
        private readonly toggleClientStatusUseCase: ToggleClientStatusUseCase,
    ) { }

    @Post()
    async create(
        @Body() createClientDto: CreateClientDto,
    ) {
        const client = await this.createClientUseCase.execute(createClientDto);
        return {
            message: 'Cliente creado correctamente',
            client,
        };
    }


    @Get()
    async findAll() {
        return await this.getClientsUseCase.execute();
    }

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateClientDto: UpdateClientDto,
    ) {
        await this.updateClientUseCase.execute(id, updateClientDto);
        return {
            message: 'Cliente actualizado correctamente',
        };
    }

    @Patch(':id/status')
    async toggleStatus(
        @Param('id') id: string,
        @Body('isActive') status: boolean,
    ) {
        await this.toggleClientStatusUseCase.execute(id, status);
        return {
            message: `Cliente ${status ? 'activado' : 'desactivado'} correctamente`,
        };
    }
}
