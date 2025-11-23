export class Password {
  private readonly password: string;

  constructor(password: string) {
    if (!password || password === "") {
      throw new Error("Senha deve ter pelo menos 8 caracteres.");
    }

    if (password.length < 8) {
      throw new Error("Senha deve ter pelo menos 8 caracteres.");
    }

    this.password = password;
  }

  getValue(): string {
    return this.password;
  }
}