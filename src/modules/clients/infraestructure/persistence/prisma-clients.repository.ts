import { ConflictException, Injectable } from "@nestjs/common";
import { IClientRepository } from "../../domain/client.repository";
import { PrismaService } from "src/core/prisma.service";
import { Client } from "../../domain/client.entity";
import { Prisma } from "@prisma/client";


@Injectable()
export class PrismaClientRepository implements IClientRepository {
    constructor(private prismaService: PrismaService) { }

    async save(client: Client): Promise<void> {
        try {
            await this.prismaService.client.create({
                data: {
                    id: client.id,
                    name: client.name,
                    email: client.email,
                    password: client.password,
                    phone: client.phone,
                    address: client.address,
                    isActive: client.isActive,
                },
            });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
                throw new ConflictException('Ya existe un cliente con ese email');
            }
            throw error;
        }
    }

    async findAll(): Promise<Client[]> {
        const items = await this.prismaService.client.findMany({
            where: { isActive: true },
        });
        return items.map(
            (item) =>
                new Client(
                    item.id,
                    item.name,
                    item.email,
                    item.password,
                    item.resetToken,
                    item.resetTokenExpires,
                    item.phone || '',
                    item.address || '',
                    item.createdAt,
                    item.isActive,
                ),
        );
    }

    async updateStatus(id: string, status: boolean): Promise<void> {
        await this.prismaService.client.update({
            where: { id },
            data: { isActive: status },
        });
    }

    async findById(id: string): Promise<Client | null> {
        const item = await this.prismaService.client.findUnique({
            where: { id },
            include: {
                invoices: {
                    orderBy: {
                        invoiceDate: 'desc',
                    },
                },
            },
        });
        if (!item) return null;
        return new Client(
            item.id,
            item.name,
            item.email,
            item.password,
            item.resetToken,
            item.resetTokenExpires,
            item.phone || '',
            item.address || '',
            item.createdAt,
            item.isActive,
            item.invoices.map((inv) => ({
                id: inv.id,
                invoiceDate: inv.invoiceDate,
                total: Number(inv.total),
            })),
        );
    }

    async update(id: string, client: Client): Promise<void> {
        await this.prismaService.client.update({
            where: { id },
            data: {
                name: client.name,
                email: client.email,
                password: client.password,
                resetToken: client.resetToken,
                resetTokenExpires: client.resetTokenExpires,
                phone: client.phone,
                address: client.address,
                isActive: client.isActive,
            },
        });
    }

    async findByEmail(email: string): Promise<Client | null> {
        const item = await this.prismaService.client.findUnique({
            where: { email },
            include: {
                invoices: {
                    orderBy: {
                        invoiceDate: 'desc',
                    },
                },
            },
        });
        if (!item) return null;
        return new Client(
            item.id,
            item.name,
            item.email,
            item.password,
            item.resetToken,
            item.resetTokenExpires,
            item.phone || '',
            item.address || '',
            item.createdAt,
            item.isActive,
            item.invoices.map((inv) => ({
                id: inv.id,
                invoiceDate: inv.invoiceDate,
                total: Number(inv.total),
            })),
        );
    }

    async findByResetToken(token: string): Promise<Client | null> {
        const item = await this.prismaService.client.findFirst({
            where: { resetToken: token },
            include: {
                invoices: {
                    orderBy: {
                        invoiceDate: 'desc',
                    },
                },
            },
        });
        if (!item) return null;
        return new Client(
            item.id,
            item.name,
            item.email,
            item.password,
            item.resetToken,
            item.resetTokenExpires,
            item.phone || '',
            item.address || '',
            item.createdAt,
            item.isActive,
            item.invoices.map((inv) => ({
                id: inv.id,
                invoiceDate: inv.invoiceDate,
                total: Number(inv.total),
            })),
        );
    }
}