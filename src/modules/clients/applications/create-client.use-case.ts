import { Inject, Injectable } from "@nestjs/common";
import { CreateClientDto } from "../presentation/dto/create-client.dto";
import type { IClientRepository } from "../domain/client.repository";
import { Client } from "../domain/client.entity";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class CreateClientUseCase {
    constructor(
        @Inject('IClientRepository')
        private readonly clientRepository: IClientRepository,
        private readonly jwtService: JwtService
    ) { }

    async execute(createdClientDto: CreateClientDto) {
        const hashedPassword = await bcrypt.hash(createdClientDto.password, 10);
        const client = new Client(
            createdClientDto.id,
            createdClientDto.name,
            createdClientDto.email,
            hashedPassword,
            null,
            null,
            createdClientDto.phone,
            createdClientDto.address
        );
        await this.clientRepository.save(client);

        const payload = { sub: client.id, email: client.email, role: 'client' };
        const token = this.jwtService.sign(payload);

        return {
            id: client.id,
            name: client.name,
            email: client.email,
            phone: client.phone,
            address: client.address,
            token,
        };
    }
}