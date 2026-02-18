import { Inject, Injectable } from "@nestjs/common";
import { CreateClientDto } from "../presentation/dto/create-client.dto";
import type { IClientRepository } from "../domain/client.repository";
import { Client } from "../domain/client.entity";


@Injectable()
export class CreateClientUseCase {
    constructor(
        @Inject('IClientRepository')
        private readonly clientRepository: IClientRepository
    ) { }

    async execute(createdClientDto: CreateClientDto) {
        const client = new Client(
            createdClientDto.id,
            createdClientDto.name,
            createdClientDto.email,
            createdClientDto.phone,
            createdClientDto.address
        );
        await this.clientRepository.save(client);
        return client;
    }
}