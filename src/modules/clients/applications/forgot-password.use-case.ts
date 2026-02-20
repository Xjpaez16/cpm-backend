import { Inject, Injectable } from '@nestjs/common';
import type { IClientRepository } from '../domain/client.repository';
import { ForgotPasswordDto } from '../presentation/dto/forgot-password.dto';
import * as crypto from 'crypto';
import { MailService } from '../../mail/mail.service';

@Injectable()
export class ForgotPasswordUseCase {
    constructor(
        @Inject('IClientRepository')
        private readonly clientRepository: IClientRepository,
        private readonly mailService: MailService,
    ) { }

    async execute(dto: ForgotPasswordDto): Promise<void> {
        const client = await this.clientRepository.findByEmail(dto.email);
        if (!client) {
            // We shouldn't leak whether an email exists or not, so we just return silently
            return;
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        const tokenExpires = new Date();
        tokenExpires.setHours(tokenExpires.getHours() + 1); // 1 hour expiration

        client.resetToken = resetToken;
        client.resetTokenExpires = tokenExpires;

        await this.clientRepository.update(client.id, client);

        await this.mailService.sendPasswordResetEmail(client.email, resetToken);
    }
}
