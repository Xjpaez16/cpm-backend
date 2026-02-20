import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import type { IClientRepository } from "../domain/client.repository";
import { LoginClientDto } from "../presentation/dto/login-client.dto";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class LoginClientUseCase {
    constructor(
        @Inject('IClientRepository')
        private readonly clientRepository: IClientRepository,
        private readonly jwtService: JwtService
    ) { }

    async execute(loginClientDto: LoginClientDto) {
        const client = await this.clientRepository.findByEmail(loginClientDto.email);

        if (!client || !client.isActive) {
            throw new UnauthorizedException('Credenciales inválidas');
        }

        const isPasswordValid = await bcrypt.compare(loginClientDto.password, client.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Credenciales inválidas');
        }

        const payload = { sub: client.id, email: client.email, role: 'client' };
        const token = this.jwtService.sign(payload);

        return {
            id: client.id,
            name: client.name,
            email: client.email,
            token,
        };
    }
}
