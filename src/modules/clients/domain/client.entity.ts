export class Client {
    constructor(
        public id: string,
        public name: string,
        public email: string,
        public password: string,
        public resetToken?: string | null,
        public resetTokenExpires?: Date | null,
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