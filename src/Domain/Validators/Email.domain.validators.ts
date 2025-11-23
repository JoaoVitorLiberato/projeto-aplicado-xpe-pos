export class Email {
  private readonly email: string;

  constructor(email: string) {
    const emailRegex = /^(([a-zA-Z0-9][-_.]{0,1}){0,63})([^\W_])+@([a-zA-Z0-9]{1,63})(\.[a-zA-Z0-9]{2,63})+$/i;

    if (!email) {
      throw new Error("Email não pode está vazio.");
    }

    if (!emailRegex.test(email)) {
      throw new Error("Email inválido.");
    }

    this.email = email;
  }

  getValue(): string {
    return this.email;
  }
}