export class Name {
  private readonly name: string;

  constructor(name: string) {
    if (!name) {
      throw new Error("Nome é obrigatório");
    }
    this.name = name;
  }

  getValue(): string {
    return this.name;
  }
}