export class Age {
  private readonly value: number;

  constructor(value: number) {
    if (!Number.isInteger(value) || value < 18 || value > 120) {
      throw new Error("Idade inválida. Deve ser um número inteiro entre 18 e 120.");
    }

    this.value = value;
  }

  public getValue(): number {
    return this.value;
  }

  public isAdult(): boolean {
    return this.value >= 18;
  }
}