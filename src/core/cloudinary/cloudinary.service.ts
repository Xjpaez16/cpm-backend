import { Inject, Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
import { CLOUDINARY_CONNECTOR } from './cloudinary.provider';

@Injectable()
export class CloudinaryService {

  constructor(@Inject(CLOUDINARY_CONNECTOR) private readonly connector) { }

  async uploadFile(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        {
          folder: 'acpm-products',
        },
        (error, result) => {
          // Si hay error de Cloudinary, rechazamos
          if (error) return reject(error);

          // Si por alguna razón no hay resultado ni error ,lanzamos error
          if (!result)
            return reject(
              new Error('Cloudinary no devolvió ningún resultado.'),
            );

          // Ahora sí, resolvemos con total seguridad
          resolve(result);
        },
      );

      upload.end(file.buffer);//se envia el archivo desde la memoria
    });
  }

  async deleteFile(publicId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) return reject(error);
        resolve();
      });
    });
  }
}
