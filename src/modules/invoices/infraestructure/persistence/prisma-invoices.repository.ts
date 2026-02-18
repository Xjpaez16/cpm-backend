import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/core/prisma.service";
import { IInvoiceRepository } from "../../domain/invoice.repository";
import { Invoice, InvoiceItem } from "../../domain/invoice.entity";

@Injectable()
export class PrismaInvoicesRepository implements IInvoiceRepository {
    constructor(private readonly prisma: PrismaService) { }

    async save(invoice: Invoice): Promise<void> {
        await this.prisma.invoice.create({
            data: {
                id: invoice.id,
                invoiceDate: invoice.invoiceDate,
                total: invoice.total,
                clientId: invoice.clientId,
                items: {
                    create: invoice.items.map(item => ({
                        id: item.id,
                        quantity: item.quantity,
                        price: item.price,
                        productId: item.productId,
                    }))
                }
            }
        });
    }

    async findAll(): Promise<Invoice[]> {
        const items = await this.prisma.invoice.findMany({
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            },
            orderBy: {
                invoiceDate: 'desc'
            }
        });

        return items.map(item => new Invoice(
            item.id,
            item.invoiceDate,
            Number(item.total),
            item.clientId,
            item.items.map(ii => new InvoiceItem(
                ii.id,
                ii.productId,
                ii.quantity,
                Number(ii.price),
                ii.product.name
            ))
        ));
    }

    async findById(id: string): Promise<Invoice | null> {
        const item = await this.prisma.invoice.findUnique({
            where: { id },
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            }
        });

        if (!item) return null;

        return new Invoice(
            item.id,
            item.invoiceDate,
            Number(item.total),
            item.clientId,
            item.items.map(ii => new InvoiceItem(
                ii.id,
                ii.productId,
                ii.quantity,
                Number(ii.price),
                ii.product.name
            ))
        );
    }
}
