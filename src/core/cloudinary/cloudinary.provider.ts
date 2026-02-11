import { v2 as cloudinary } from 'cloudinary';

export const CLOUDINARY_CONNECTOR = 'CLOUDINARY_CONNECTOR';

export const CloudinaryProvider = {
  provide: CLOUDINARY_CONNECTOR,
  useFactory: () => {
    return cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  },
};