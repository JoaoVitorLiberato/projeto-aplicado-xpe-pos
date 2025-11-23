export class Price {
  private readonly value: number;

  constructor(value: number) {
    if (!Number.isInteger(value)) {
      throw new Error("O typeof do preço deve ser um número inteiro.");
    }

    this.value = value;
  }

  public getValue(): number {
    return this.value;
  }
}