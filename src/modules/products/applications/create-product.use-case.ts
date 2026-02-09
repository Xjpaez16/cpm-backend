import { Inject, Injectable } from "@nestjs/common";
import type { IProductRepository } from "../domain/product.respository";
import { Product } from "../domain/product.entity";


@Injectable()
export class CreateProductUseCase {
    
    constructor(
        @Inject('IProductRepository') 
        private readonly productRepository: IProductRepository
    ){}

    async execute(data : {name: string, price: number, stock: number, description?: string, images: string[]}){
        //Genera un ID único para el nuevo producto.
        const id = crypto.randomUUID();
        // Creamos una nueva instancia de nuestra entidad.
        const product = new Product(
            id,
            data.name,
            data.price,
            data.stock,
            data.description,
            data.images
        );
        // Guardamos el nuevo producto utilizando el repositorio.
        await this.productRepository.save(product);
        // Retornamos el producto creado.
        return product;
    }
}