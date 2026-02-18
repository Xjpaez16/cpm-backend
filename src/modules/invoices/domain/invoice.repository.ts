import { Invoice } from "./invoice.entity";

export interface IInvoiceRepository {
    save(invoice: Invoice): Promise<void>;
    findAll(): Promise<Invoice[]>;
    findById(id: string): Promise<Invoice | null>;
}
