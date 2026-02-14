import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { CreateProductUseCase } from '../applications/create-product.use-case';
import { GetProductsUseCase } from '../applications/get-products.use-case';
import { UpdateProductUseCase } from '../applications/update-product.use-case';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ToggleProductStatusUseCase } from '../applications/toggle-product-status.use-case';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/core/cloudinary/cloudinary.service';

@Controller('products')
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly getProductsUseCase: GetProductsUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    private readonly toggleProductStatusUseCase: ToggleProductStatusUseCase,
    private readonly cloudinaryService: CloudinaryService,
  ) { }

  @Post() //Escucha peticiones POST en la ruta /products
  @UseInterceptors(FilesInterceptor('images', 5)) //Utiliza el interceptor FileInterceptor para manejar la carga de archivos, esperando un archivo con el campo 'image'.
  async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    //Se sube la imagen a cloudinary
    try {
      let imagesData: { url: string; publicId: string }[] = [];

      if (files && files.length > 0) {
        const uploadPromises = files.map((file) =>
          this.cloudinaryService.uploadFile(file),
        );
        const uploadResults = await Promise.all(uploadPromises);
        //Se asigna la URL de la imagen subida al DTO de creación del producto.
        imagesData = uploadResults.map((res) => ({
          url: res.secure_url,
          publicId: res.public_id,
        }));
      }

      // Llama al caso de uso para crear un nuevo producto con los datos recibidos en el cuerpo de la solicitud.
      const product = await this.createProductUseCase.execute(
        createProductDto,
        imagesData,
      );
      // Retorna el producto creado como respuesta.
      return product;

    } catch (error) {
      console.log('Error al procesar la creación del producto:', error);
      throw error; // Lanza el error para que sea manejado por el middleware de errores global
    }
  }

  @Get() //Trae todos los productos disponibles en la base de datos.
  async findAll() {
    return await this.getProductsUseCase.execute();
  }

  @Patch(':id/status') //Escucha peticiones PATCH en la ruta /products/:id/status para actualizar el estado de un producto específico.
  async toggleStatus(
    @Param('id') id: string,
    @Body('isActive') status: boolean,
  ) {
    await this.toggleProductStatusUseCase.execute(id, status);
    return {
      message: `Producto ${status ? 'activado' : 'desactivado'} correctamente`,
    };
  }

  @Patch(':id')
  @UseInterceptors(FilesInterceptor('images', 5))
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    let imagesData: { url: string; publicId: string }[] | undefined;

    if (files && files.length > 0) {
      try {
        const uploadPromises = files.map((file) =>
          this.cloudinaryService.uploadFile(file),
        );
        const uploadResults = await Promise.all(uploadPromises);
        imagesData = uploadResults.map((res) => ({
          url: res.secure_url,
          publicId: res.public_id,
        }));
      } catch (error) {
        console.log('Error al subir las imágenes a Cloudinary:', error);
        throw error;
      }
    }

    await this.updateProductUseCase.execute(id, updateProductDto, imagesData);
    return {
      message: 'Producto actualizado correctamente',
    };
  }
}
