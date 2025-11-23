export class Phone {
  private readonly phone: string;

  constructor(phone: string) {
    const phoneRegex = /^(0?\(?[0-9]{2}\)?[0-9]{4,5}-?[0-9]{4})$/i;
    if (!phone || !phoneRegex.test(phone)) {
      throw new Error("Telefone inválido.");
    }
    this.phone = phone;
  }

  getValue(): string {
    return this.phone;
  }
}