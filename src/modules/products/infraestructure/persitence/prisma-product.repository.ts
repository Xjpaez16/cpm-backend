import { Injectable } from "@nestjs/common";
import { IProductRepository } from "../../domain/product.respository";
import { Product } from "../../domain/product.entity";
import { PrismaService } from "src/core/prisma.service";


@Injectable()
export class PrismaProductRepository implements IProductRepository{

    constructor(private prismaService: PrismaService){}


    async save(product: Product): Promise<void> {
        await this.prismaService.product.create({
            data :{
                id: product.id,
                name: product.name,
                price: product.price,
                stock: product.stock,
                description: product.description,
                images: {
                   create: product.images.map(url => ({ 
                    url: url,
                    publicId: 'temp_id'
                   }))
                }
            }
        })
    }

    async findAll(): Promise<Product[]> {
        // Implementación para obtener todos los productos
        const items = await this.prismaService.product.findMany({
            include : {
                images : true
            }
        });
        // Mapear los resultados a la entidad Product con el tipo de datos
        return items.map(item => new Product(
            item.id,
            item.name,
            Number(item.price),
            item.stock,
            item.description || "",
            item.images.map(image => image.url)
        ))

    }

}