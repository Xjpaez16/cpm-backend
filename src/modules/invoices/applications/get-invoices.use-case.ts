import { Inject, Injectable } from "@nestjs/common";
import type { IInvoiceRepository } from "../domain/invoice.repository";
import { Invoice } from "../domain/invoice.entity";

@Injectable()
export class GetInvoicesUseCase {
    constructor(
        @Inject('IInvoiceRepository')
        private readonly invoiceRepository: IInvoiceRepository
    ) { }

    async execute(): Promise<Invoice[]> {
        return await this.invoiceRepository.findAll();
    }
}
