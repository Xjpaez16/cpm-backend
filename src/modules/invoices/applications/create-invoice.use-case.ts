import { Inject, Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import type { IInvoiceRepository } from "../domain/invoice.repository";
import type { IClientRepository } from "../../clients/domain/client.repository";
import type { IProductRepository } from "../../products/domain/product.respository";
import { Invoice, InvoiceItem } from "../domain/invoice.entity";
import { CreateInvoiceDto } from "../presentation/dto/create-invoice.dto";

@Injectable()
export class CreateInvoiceUseCase {
    constructor(
        @Inject('IInvoiceRepository')
        private readonly invoiceRepository: IInvoiceRepository,
        @Inject('IClientRepository')
        private readonly clientRepository: IClientRepository,
        @Inject('IProductRepository')
        private readonly productRepository: IProductRepository
    ) { }

    async execute(createInvoiceDto: CreateInvoiceDto): Promise<Invoice> {
        // 1. Validar cliente
        const client = await this.clientRepository.findById(createInvoiceDto.clientId);
        if (!client) {
            throw new NotFoundException(`Client with id ${createInvoiceDto.clientId} not found`);
        }

        const invoiceItems: InvoiceItem[] = [];
        let total = 0;

        // 2. Procesar items
        for (const itemDto of createInvoiceDto.items) {
            const product = await this.productRepository.findById(itemDto.productId);
            if (!product) {
                throw new NotFoundException(`Product with id ${itemDto.productId} not found`);
            }

            if (product.stock < itemDto.quantity) {
                throw new BadRequestException(`Not enough stock for product ${product.name}. Available: ${product.stock}, requested: ${itemDto.quantity}`);
            }

            const itemTotal = Number(product.price) * itemDto.quantity;
            total += itemTotal;

            invoiceItems.push(new InvoiceItem(
                crypto.randomUUID(),
                product.id,
                itemDto.quantity,
                Number(product.price),
                product.name
            ));

            // Actualizar stock del producto
            product.stock -= itemDto.quantity;
            await this.productRepository.update(product.id, product);
        }

        const invoice = new Invoice(
            crypto.randomUUID(),
            new Date(),
            total,
            client.id,
            invoiceItems
        );

        await this.invoiceRepository.save(invoice);
        return invoice;
    }
}
