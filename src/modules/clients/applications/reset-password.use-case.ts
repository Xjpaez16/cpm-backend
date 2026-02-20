import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import type { IClientRepository } from '../domain/client.repository';
import { ResetPasswordDto } from '../presentation/dto/reset-password.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ResetPasswordUseCase {
    constructor(
        @Inject('IClientRepository')
        private readonly clientRepository: IClientRepository,
    ) { }

    async execute(dto: ResetPasswordDto): Promise<void> {
        const client = await this.clientRepository.findByResetToken(dto.token);

        if (!client || !client.resetTokenExpires || client.resetTokenExpires < new Date()) {
            throw new BadRequestException('El token es inválido o ha expirado');
        }

        const hashedPassword = await bcrypt.hash(dto.newPassword, 10);

        client.password = hashedPassword;
        client.resetToken = null;
        client.resetTokenExpires = null;

        await this.clientRepository.update(client.id, client);
    }
}
