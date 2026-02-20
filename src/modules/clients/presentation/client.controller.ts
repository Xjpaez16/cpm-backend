import { Body, Controller, Get, Param, Patch, Post, HttpCode } from '@nestjs/common';
import { UpdateClientUseCase } from '../applications/update-client.use-case';
import { UpdateClientDto } from './dto/update-client.dto';
import { GetClientsUseCase } from '../applications/get-clients.use-case';
import { CreateClientUseCase } from '../applications/create-client.use-case';
import { CreateClientDto } from './dto/create-client.dto';
import { ToggleClientStatusUseCase } from '../applications/toggle-client-status.use-case';
import { ForgotPasswordUseCase } from '../applications/forgot-password.use-case';
import { ResetPasswordUseCase } from '../applications/reset-password.use-case';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { LoginClientUseCase } from '../applications/login-client.use-case';
import { LoginClientDto } from './dto/login-client.dto';

@Controller('clients')
export class ClientController {
    constructor(
        private readonly updateClientUseCase: UpdateClientUseCase,
        private readonly getClientsUseCase: GetClientsUseCase,
        private readonly createClientUseCase: CreateClientUseCase,
        private readonly toggleClientStatusUseCase: ToggleClientStatusUseCase,
        private readonly forgotPasswordUseCase: ForgotPasswordUseCase,
        private readonly resetPasswordUseCase: ResetPasswordUseCase,
        private readonly loginClientUseCase: LoginClientUseCase,
    ) { }

    @Post()
    async create(
        @Body() createClientDto: CreateClientDto,
    ) {
        const client = await this.createClientUseCase.execute(createClientDto);
        return {
            message: 'Cliente creado correctamente',
            client,
        };
    }

    @Post('login')
    @HttpCode(200)
    async login(
        @Body() loginClientDto: LoginClientDto,
    ) {
        const result = await this.loginClientUseCase.execute(loginClientDto);
        return {
            message: 'Login realizado con éxito',
            ...result,
        };
    }

    @Post('forgot-password')
    async forgotPassword(
        @Body() forgotPasswordDto: ForgotPasswordDto,
    ) {
        await this.forgotPasswordUseCase.execute(forgotPasswordDto);
        return {
            message: 'Si el correo está registrado, se ha enviado un enlace para restablecer la contraseña.',
        };
    }

    @Post('reset-password')
    async resetPassword(
        @Body() resetPasswordDto: ResetPasswordDto,
    ) {
        await this.resetPasswordUseCase.execute(resetPasswordDto);
        return {
            message: 'Contraseña restablecida correctamente.',
        };
    }


    @Get()
    async findAll() {
        return await this.getClientsUseCase.execute();
    }

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateClientDto: UpdateClientDto,
    ) {
        await this.updateClientUseCase.execute(id, updateClientDto);
        return {
            message: 'Cliente actualizado correctamente',
        };
    }

    @Patch(':id/status')
    async toggleStatus(
        @Param('id') id: string,
        @Body('isActive') status: boolean,
    ) {
        await this.toggleClientStatusUseCase.execute(id, status);
        return {
            message: `Cliente ${status ? 'activado' : 'desactivado'} correctamente`,
        };
    }
}
