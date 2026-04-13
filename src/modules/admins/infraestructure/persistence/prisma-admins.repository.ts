import { Injectable } from "@nestjs/common";
import { IAdminRepository } from "../../domain/admin.repository";
import { PrismaService } from "src/core/prisma.service";
import { Admin } from "../../domain/admin.entity";

@Injectable()
export class PrismaAdminRepository implements IAdminRepository {
    constructor(private prismaService: PrismaService) { }

    async findById(id: string): Promise<Admin | null> {
        const item = await this.prismaService.admin.findUnique({
            where: { id },
        });

        if (!item) return null;

        return new Admin(
            item.id,
            item.username,
            item.email,
            item.password,
            item.isActive,
            item.createdAt
        );
    }

    async findByUsername(username: string): Promise<Admin | null> {
        const item = await this.prismaService.admin.findUnique({
            where: { username },
        });

        if (!item) return null;

        return new Admin(
            item.id,
            item.username,
            item.email,
            item.password,
            item.isActive,
            item.createdAt
        );
    }

    async findByEmail(email: string): Promise<Admin | null> {
        const item = await this.prismaService.admin.findUnique({
            where: { email },
        });

        if (!item) return null;

        return new Admin(
            item.id,
            item.username,
            item.email,
            item.password,
            item.isActive,
            item.createdAt
        );
    }
}
