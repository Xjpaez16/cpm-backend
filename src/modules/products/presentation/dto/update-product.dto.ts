import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, MaxLength, Min } from "class-validator";

export class UpdateProductDto {
    @IsString()
    @IsOptional()
    @MaxLength(200, { message: 'El nombre es muy largo (máximo 200 caracteres)' })
    name?: string; å

    @Type(() => Number)
    @IsInt({ message: 'El precio debe ser un número entero (Pesos Colombianos)' })
    @Min(100, { message: 'El precio mínimo debe ser de $100 pesos' })
    @IsOptional()
    price?: number;

    @Type(() => Number)
    @IsInt({ message: 'El stock debe ser un número entero' })
    @Min(0, { message: 'El stock no puede ser negativo' })
    @IsOptional()
    stock?: number;

    @IsString()
    @IsOptional()
    description?: string;
}
