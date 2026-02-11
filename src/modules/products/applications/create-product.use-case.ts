import { Inject, Injectable } from "@nestjs/common";
import type { IProductRepository } from "../domain/product.respository";
import { Product } from "../domain/product.entity";
import { CreateProductDto } from "../presentation/dto/create-product.dto";


@Injectable()
export class CreateProductUseCase {
    
    constructor(
        @Inject('IProductRepository') 
        private readonly productRepository: IProductRepository
    ){}

    async execute(createdProductDto: CreateProductDto, imagesData:{url :string, publicId: string}[]): Promise<Product> {
        //Genera un ID único para el nuevo producto.
        const id = crypto.randomUUID();
        // Creamos una nueva instancia de nuestra entidad.
        const product = new Product(
            id,
            createdProductDto.name,
            createdProductDto.price,
            createdProductDto.stock,
            createdProductDto.description,
            imagesData
        );
        // Guardamos el nuevo producto utilizando el repositorio.
        await this.productRepository.save(product);
        // Retornamos el producto creado.
        return product;
    }
}