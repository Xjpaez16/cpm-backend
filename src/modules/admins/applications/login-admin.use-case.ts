import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import type { IAdminRepository } from "../domain/admin.repository";
import { LoginAdminDto } from "../presentation/dto/login-admin.dto";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class LoginAdminUseCase {
    constructor(
        @Inject('IAdminRepository')
        private readonly adminRepository: IAdminRepository,
        private readonly jwtService: JwtService
    ) { }

    async execute(loginAdminDto: LoginAdminDto) {
        const admin = await this.adminRepository.findByUsername(loginAdminDto.username);

        if (!admin || !admin.isActive) {
            throw new UnauthorizedException('Credenciales inválidas');
        }

        const isPasswordValid = await bcrypt.compare(loginAdminDto.password, admin.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Credenciales inválidas');
        }

        const payload = { sub: admin.id, username: admin.username, role: 'admin' };
        const token = this.jwtService.sign(payload);

        return {
            id: admin.id,
            username: admin.username,
            token,
        };
    }
}
