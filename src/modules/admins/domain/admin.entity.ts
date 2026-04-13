export class Admin {
    constructor(
        public id: string,
        public username: string,
        public email: string,
        public password: string,
        public isActive: boolean = true,
        public createdAt?: Date
    ) { }
}
