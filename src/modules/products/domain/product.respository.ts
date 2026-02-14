import { Product } from "./product.entity";


export interface IProductRepository {
    save(product: Product): Promise<void>;
    findAll(): Promise<Product[]>;
    updateStatus(id: string, status: boolean): Promise<void>;
    findById(id: string): Promise<Product | null>;
    update(id: string, product: Product): Promise<void>;
}