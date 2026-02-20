import { Type } from 'class-transformer';
import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min } from "class-validator";


export class CreateClientDto {

    @IsString()
    @IsNotEmpty({ message: 'El ID del cliente es obligatorio' })
    id: string;

    @IsString()
    @IsNotEmpty({ message: 'El nombre del cliente es obligatorio' })
    @MaxLength(200, { message: 'El nombre es muy largo (máximo 200 caracteres)' })
    name: string;

    @IsString()
    @IsNotEmpty({ message: 'El email del cliente es obligatorio' })
    @MaxLength(200, { message: 'El email es muy largo (máximo 200 caracteres)' })
    email: string;

    @IsString()
    @IsNotEmpty({ message: 'El teléfono del cliente es obligatorio' })
    @MaxLength(200, { message: 'El teléfono es muy largo (máximo 200 caracteres)' })
    phone: string;

    @IsString()
    @IsNotEmpty({ message: 'La contraseña es obligatoria' })
    password: string;

    @IsString()
    @IsNotEmpty({ message: 'La dirección del cliente es obligatoria' })
    @MaxLength(200, { message: 'La dirección es muy larga (máximo 200 caracteres)' })
    address: string;
}