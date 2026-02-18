import { Inject, Injectable } from "@nestjs/common";
import type { IClientRepository } from "../domain/client.repository";
import { Client } from "../domain/client.entity";

@Injectable()
export class GetClientsUseCase {
    constructor(
        @Inject('IClientRepository')
        private readonly clientRepository: IClientRepository
    ) { }

    async execute(): Promise<Client[]> {
        return await this.clientRepository.findAll();
    }
}