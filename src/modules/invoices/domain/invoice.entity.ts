export class InvoiceItem {
    constructor(
        public readonly id: string,
        public readonly productId: string,
        public readonly quantity: number,
        public readonly price: number,
        public readonly productName?: string
    ) { }
}

export class Invoice {
    constructor(
        public readonly id: string,
        public readonly invoiceDate: Date,
        public readonly total: number,
        public readonly clientId: string,
        public readonly items: InvoiceItem[] = []
    ) { }
}
