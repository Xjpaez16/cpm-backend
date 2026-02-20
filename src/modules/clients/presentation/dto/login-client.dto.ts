import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginClientDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}
