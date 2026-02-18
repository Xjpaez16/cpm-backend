import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import type { IClientRepository } from "../domain/client.repository";
import type { UpdateClientDto } from "../presentation/dto/update-client.dto";

@Injectable()
export class UpdateClientUseCase {
    constructor(
        @Inject('IClientRepository')
        private readonly clientRepository: IClientRepository
    ) { }

    async execute(id: string, updateClientDto: UpdateClientDto): Promise<void> {
        const client = await this.clientRepository.findById(id);
        if (!client) {
            throw new NotFoundException(`Client with id ${id} not found`);
        }

        if (updateClientDto.name !== undefined) client.name = updateClientDto.name;
        if (updateClientDto.email !== undefined) client.email = updateClientDto.email;
        if (updateClientDto.phone !== undefined) client.phone = updateClientDto.phone;
        if (updateClientDto.address !== undefined) client.address = updateClientDto.address;
        await this.clientRepository.update(id, client);
    }
}