import { Type } from 'class-transformer';
import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min } from "class-validator";

export class CreateProductDto {


    @IsString()
    @IsNotEmpty({ message: 'El nombre del producto es obligatorio' })
    @MaxLength(200, { message: 'El nombre es muy largo (máximo 200 caracteres)' })
    name: string;

    @Type(() => Number)
    @IsInt({ message: 'El precio debe ser un número entero (Pesos Colombianos)' })
    @Min(100, { message: 'El precio mínimo debe ser de $100 pesos' })
    price: number;

    @Type(() => Number)
    @IsInt({ message: 'El stock debe ser un número entero' })
    @Min(0, { message: 'El stock no puede ser negativo' })
    stock: number;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    category?: string;
}