import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
    private readonly logger = new Logger(MailService.name);

    constructor(private readonly mailerService: MailerService) { }

    async sendPasswordResetEmail(email: string, token: string): Promise<void> {
        const resetUrl = `http://localhost:3000/reset-password?token=${token}`; // Assuming a frontend route

        try {
            await this.mailerService.sendMail({
                to: email,
                subject: 'Recuperación de Contraseña',
                text: `Has solicitado recuperar tu contraseña. Por favor usa este token para restablecerla:\n\n${token}\n\nO visita el siguiente enlace: ${resetUrl}`,
                html: `
          <h3>Recuperación de Contraseña</h3>
          <p>Has solicitado recuperar tu contraseña. Por favor usa este token para restablecerla:</p>
          <p><strong>${token}</strong></p>
          <p>O haz clic en el siguiente enlace:</p>
          <a href="${resetUrl}">Restablecer contraseña</a>
        `,
            });
            this.logger.log(`Password reset email sent to ${email}`);
        } catch (error) {
            this.logger.error(`Error sending password reset email to ${email}`, error);
            // Depending on requirements, we might not want to throw the error to not expose email delivery failures
            // throw error; 
        }
    }
}
