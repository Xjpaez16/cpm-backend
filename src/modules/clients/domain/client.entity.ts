export class Client {
    constructor(
        public readonly id: string,
        public name: string,
        public email: string,
        public phone?: string,
        public address?: string,
        public createdAt?: Date,
        public isActive: boolean = true,
        public invoices: {
            id: string;
            invoiceDate: Date;
            total: number;
        }[] = []
    ) { }
}