import { Module } from "@nestjs/common";
import { ProductController } from "./presentation/product.controller";
import { CreateProductUseCase } from "./applications/create-product.use-case";
import { PrismaService } from "src/core/prisma.service";
import { PrismaProductRepository } from "./infraestructure/persitence/prisma-product.repository";
import { GetProductsUseCase } from "./applications/get-products.use-case";
import { UpdateProductUseCase } from "./applications/update-product.use-case";
import { ToggleProductStatusUseCase } from "./applications/toggle-product-status.use-case";
import { CloudinaryService } from "src/core/cloudinary/cloudinary.service";
import { CloudinaryModule } from "src/core/cloudinary/cloudinary.module";

@Module({
    imports: [
        CloudinaryModule
    ],
    controllers: [ProductController],
    providers: [
        CreateProductUseCase,
        GetProductsUseCase,
        UpdateProductUseCase,
        ToggleProductStatusUseCase,
        PrismaService,
        CloudinaryService,
        {
            //Inyeccion de la clase IProductRepository con la implementación PrismaProductRepository
            provide: 'IProductRepository',
            useClass: PrismaProductRepository,
        }
    ],

})

export class ProductModule { }