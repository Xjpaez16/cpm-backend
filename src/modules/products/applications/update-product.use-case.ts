import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import type { IProductRepository } from "../domain/product.respository";
import { Product } from "../domain/product.entity";
import { UpdateProductDto } from "../presentation/dto/update-product.dto";
import { CloudinaryService } from "src/core/cloudinary/cloudinary.service";


@Injectable()
export class UpdateProductUseCase {

    constructor(
        @Inject('IProductRepository')
        private readonly productRepository: IProductRepository,
        private readonly cloudinaryService: CloudinaryService
    ) { }

    async execute(id: string, updateProductDto: UpdateProductDto, newImagesData?: { url: string, publicId: string }[]): Promise<void> {
        const product = await this.productRepository.findById(id);

        if (!product) {
            throw new NotFoundException(`Product with id ${id} not found`);
        }

        // Handle image replacement if new images are provided
        if (newImagesData && newImagesData.length > 0) {
            // Delete old images from Cloudinary
            if (product.images.length > 0) {
                const deletePromises = product.images.map(img => this.cloudinaryService.deleteFile(img.publicId));
                await Promise.all(deletePromises);
            }
            // Update product images
            product.images = newImagesData;
        }

        // Update fields if they are present in the DTO
        if (updateProductDto.name !== undefined) product.name = updateProductDto.name;
        if (updateProductDto.price !== undefined) product.price = updateProductDto.price;
        if (updateProductDto.stock !== undefined) product.stock = updateProductDto.stock;
        if (updateProductDto.description !== undefined) product.description = updateProductDto.description;

        await this.productRepository.update(id, product);
    }
}
