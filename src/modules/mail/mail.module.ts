import { Module, Global } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { MailService } from './mail.service';


@Global()
@Module({
    imports: [
        MailerModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                transport: {
                    host: config.get<string>('SMTP_HOST'),
                    port: config.get<number>('SMTP_PORT'),
                    secure: config.get<boolean>('SMTP_SECURE') ?? false,
                    auth: {
                        user: config.get<string>('SMTP_USER'),
                        pass: config.get<string>('SMTP_PASS'),
                    },
                },
                defaults: {
                    from: config.get<string>('SMTP_FROM') || '"No Reply" <noreply@example.com>',
                },
            }),
        }),
    ],
    providers: [MailService],
    exports: [MailService],
})
export class MailModule { }
