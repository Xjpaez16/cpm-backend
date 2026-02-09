import { Body, Controller, Post } from "@nestjs/common";
import { CreateProductUseCase } from "../applications/create-product.use-case";

@Controller('products')
export class ProductController {
        constructor(private readonly createProductUseCase: CreateProductUseCase){}

        @Post()//Escucha peticiones POST en la ruta /products
        async create(@Body() data:{name: string, price: number, stock: number, description?: string, images: string[]}){
            // Llama al caso de uso para crear un nuevo producto con los datos recibidos en el cuerpo de la solicitud.
            const product = await this.createProductUseCase.execute(data);
            // Retorna el producto creado como respuesta.
            return product;
        }
        
        
}