export class User {
  constructor(
    public readonly email: string,
    public readonly password: string,
    public readonly details: {
      name: string,
      age: number,
      phone: string,
      thumbnail?: {
        url: string,
        upload: boolean,
      }
    },
    public readonly id?: string,
  ) {}
}