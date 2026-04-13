import { Injectable } from '@nestjs/common';
import { IProductRepository } from '../../domain/product.respository';
import { Product } from '../../domain/product.entity';
import { PrismaService } from 'src/core/prisma.service';

@Injectable()
export class PrismaProductRepository implements IProductRepository {
  constructor(private prismaService: PrismaService) { }

  async save(product: Product): Promise<void> {
    await this.prismaService.product.create({
      data: {
        id: product.id,
        name: product.name,
        price: product.price,
        stock: product.stock,
        description: product.description,
        category: product.category,
        images: {
          create: product.images.map((img) => ({
            url: img.url,
            publicId: img.publicId,
          })),
        },
      },
    });
  }

  async findById(id: string): Promise<Product | null> {
    const item = await this.prismaService.product.findUnique({
      where: { id },
      include: {
        images: true,
      },
    });

    if (!item) return null;

    return new Product(
      item.id,
      item.name,
      Number(item.price),
      item.stock,
      item.description || '',
      item.category || '',
      item.images.map((image) => ({
        url: image.url,
        publicId: image.publicId,
      })),
      item.createdAt,
      item.isActive,
    );
  }

  async update(id: string, product: Product): Promise<void> {
    const data: any = {
      name: product.name,
      price: product.price,
      stock: product.stock,
      description: product.description,
      category: product.category,
      isActive: product.isActive,
    };

    if (product.images.length > 0) {
      data.images = {
        deleteMany: {},
        create: product.images.map((img) => ({
          url: img.url,
          publicId: img.publicId,
        })),
      };
    }

    await this.prismaService.product.update({
      where: { id },
      data: data,
    });
  }

  async findAll(): Promise<Product[]> {
    // Implementación para obtener todos los productos
    const items = await this.prismaService.product.findMany({
      where: { isActive: true },
      include: {
        images: true,
      },
    });
    // Mapear los resultados a la entidad Product con el tipo de datos
    return items.map(
      (item) =>
        new Product(
          item.id,
          item.name,
          Number(item.price),
          item.stock,
          item.description || '',
          item.category || '',
          item.images.map((image) => ({
            url: image.url,
            publicId: image.publicId,
          })),
          item.createdAt,
        ),
    );
  }

  async updateStatus(id: string, status: boolean): Promise<void> {
    await this.prismaService.product.update({
      where: { id },
      data: { isActive: status },
    });
  }
}
