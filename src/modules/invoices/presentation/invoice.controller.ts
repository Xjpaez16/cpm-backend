import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateInvoiceUseCase } from "../applications/create-invoice.use-case";
import { GetInvoicesUseCase } from "../applications/get-invoices.use-case";
import { CreateInvoiceDto } from "./dto/create-invoice.dto";

@Controller('invoices')
export class InvoiceController {
    constructor(
        private readonly createInvoiceUseCase: CreateInvoiceUseCase,
        private readonly getInvoicesUseCase: GetInvoicesUseCase
    ) { }

    @Post()
    async create(@Body() createInvoiceDto: CreateInvoiceDto) {
        const invoice = await this.createInvoiceUseCase.execute(createInvoiceDto);
        return {
            message: 'Factura creada correctamente',
            invoice
        };
    }

    @Get()
    async findAll() {
        return await this.getInvoicesUseCase.execute();
    }
}
