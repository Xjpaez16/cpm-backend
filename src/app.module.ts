import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './modules/products/product.module';
import { ConfigModule } from '@nestjs/config';
import { ClientModule } from './modules/clients/client.module';
import { InvoiceModule } from './modules/invoices/invoice.module';
import { MailModule } from './modules/mail/mail.module';
import { AdminModule } from './modules/admins/admin.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule,
    ProductModule,
    ClientModule,
    InvoiceModule,
    MailModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
