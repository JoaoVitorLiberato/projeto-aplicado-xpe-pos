export class Product {
  constructor (
    public tumbnail: {
      url: string,
      upload: boolean
    },
    public name: string,
    public  description: string,
    public  categoryId: string,
    public note_client: number,
    public price: {
      default: number,
      discount: {
        status: boolean,
        percentage: number
      }
    },
    public differences?: {
      [key:string]: {
        readonly: boolean,
        status: boolean,
        value: number
      },
    },
    public id?: string,
  ) {}
}
