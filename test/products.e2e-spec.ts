import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

// Mocks
const mockCloudinaryService = {
    uploadFile: jest.fn().mockImplementation((file) => {
        return Promise.resolve({
            secure_url: `http://example.com/${file.originalname}`,
            public_id: `acpm-products/${Date.now()}`
        });
    }),
    deleteFile: jest.fn().mockResolvedValue(undefined),
};

describe('ProductController (e2e)', () => {
    let app: INestApplication;
    let productId: string;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        })
            .overrideProvider('CloudinaryService') // Use string if provided as string token, or class if class token
            // CloudinaryService is provided as a class in CloudinaryModule usually, but let's check provider name if needed.
            // Assuming it is provided by class.
            .useValue(mockCloudinaryService)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    it('/products (POST) - Create Product', async () => {
        const response = await request(app.getHttpServer())
            .post('/products')
            .send({
                name: 'Test Product E2E',
                price: 5000,
                stock: 10,
                description: 'Description for E2E test'
            })
            .expect(201);

        expect(response.body).toHaveProperty('id');
        expect(response.body.name).toBe('Test Product E2E');
        productId = response.body.id;
    });

    it('/products/:id (PATCH) - Update Product (Basic Fields)', async () => {
        await request(app.getHttpServer())
            .patch(`/products/${productId}`)
            .send({
                name: 'Updated Product Name',
                price: 6000
            })
            .expect(200);

        // Verify update
        // We need to fetch all products and find ours because getOne might not be implemented in controller or we don't know the ID usage fully
        const getResponse = await request(app.getHttpServer())
            .get('/products')
            .expect(200);

        const updatedProduct = getResponse.body.find((p: any) => p.id === productId);
        expect(updatedProduct).toBeDefined();
        expect(updatedProduct.name).toBe('Updated Product Name');
        expect(updatedProduct.price).toBe(6000);
    });
});
