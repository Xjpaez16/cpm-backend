import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, MaxLength, Min } from "class-validator";

export class UpdateClientDto {
    @IsString()
    @IsOptional()
    @MaxLength(200, { message: 'El nombre es muy largo (máximo 200 caracteres)' })
    name?: string;

    @IsString()
    @IsOptional()
    @MaxLength(200, { message: 'El email es muy largo (máximo 200 caracteres)' })
    email?: string;

    @IsString()
    @IsOptional()
    @MaxLength(200, { message: 'El teléfono es muy largo (máximo 200 caracteres)' })
    phone?: string;

    @IsString()
    @IsOptional()
    @MaxLength(200, { message: 'La dirección es muy larga (máximo 200 caracteres)' })
    address?: string;
}