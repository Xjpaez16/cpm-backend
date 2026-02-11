
export class Product{
    constructor(
        public  readonly id : string,
        public name : string,
        public price : number,
        public stock : number,
        public description ?: string,
        public images : {url : string, publicId: string}[] = [],
        public createdAt ?: Date,
        public isActive : boolean = true,
    ){}
}