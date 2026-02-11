import { Inject, Injectable } from "@nestjs/common";
import type { IProductRepository } from "../domain/product.respository";
import { Product } from "../domain/product.entity";

@Injectable()
export class GetProductsUseCase {
    constructor(
        @Inject('IProductRepository')
        private readonly productRepository: IProductRepository

    ){}

    async execute():Promise<Product[]>{
        return await this.productRepository.findAll();
    }
}