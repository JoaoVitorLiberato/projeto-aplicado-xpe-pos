export class Description {
  private readonly description: string;

  constructor(description: string) {
    if (!description || description.trim().length === 0) {
      throw new Error("Descrição não pode estar vazia.");
    }
    
    if (description.length > 255) {
      throw new Error("Descrição não pode ter mais que 255 caracteres.");
    }

    this.description = description;
  }

  getValue(): string {
    return this.description;
  }
}
