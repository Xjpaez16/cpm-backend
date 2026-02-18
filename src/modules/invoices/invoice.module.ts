import { Module } from "@nestjs/common";
import { PrismaService } from "src/core/prisma.service";
import { InvoiceController } from "./presentation/invoice.controller";
import { CreateInvoiceUseCase } from "./applications/create-invoice.use-case";
import { GetInvoicesUseCase } from "./applications/get-invoices.use-case";
import { PrismaInvoicesRepository } from "./infraestructure/persistence/prisma-invoices.repository";
import { ClientModule } from "../clients/client.module";
import { ProductModule } from "../products/product.module";


@Module({
    imports: [
        ClientModule,
        ProductModule
    ],
    controllers: [InvoiceController],
    providers: [
        PrismaService,
        {
            provide: 'IInvoiceRepository',
            useClass: PrismaInvoicesRepository,
        },
        CreateInvoiceUseCase,
        GetInvoicesUseCase,
    ],
})
export class InvoiceModule { }
