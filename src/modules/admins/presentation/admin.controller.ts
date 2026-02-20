import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { LoginAdminUseCase } from '../applications/login-admin.use-case';
import { LoginAdminDto } from './dto/login-admin.dto';

@Controller('admins')
export class AdminController {
    constructor(
        private readonly loginAdminUseCase: LoginAdminUseCase,
    ) { }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(
        @Body() loginAdminDto: LoginAdminDto,
    ) {
        const admin = await this.loginAdminUseCase.execute(loginAdminDto);
        return {
            message: 'Login realizado con éxito',
            admin,
        };
    }
}
