import { Inject, Injectable } from "@nestjs/common";
import type { IProductRepository } from "../domain/product.respository";

@Injectable()
export class ToggleProductStatusUseCase {
    constructor(
        @Inject('IProductRepository') 
        private productRepository: IProductRepository
    ){}

    async execute(id: string, status: boolean): Promise<void> {
        await this.productRepository.updateStatus(id, status);
    }

}