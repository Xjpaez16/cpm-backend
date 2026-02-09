import { Module } from "@nestjs/common";
import { ProductController } from "./presentation/product.controller";
import { CreateProductUseCase } from "./applications/create-product.use-case";
import { PrismaService } from "src/core/prisma.service";
import { PrismaProductRepository } from "./infraestructure/persitence/prisma-product.repository";

@Module({
    controllers: [ProductController],
    providers: [
        CreateProductUseCase,
        PrismaService,
        {
            //Inyeccion de la clase IProductRepository con la implementación PrismaProductRepository
            provide: 'IProductRepository',
            useClass: PrismaProductRepository,
        }
    ],
    
})

export class ProductModule {}