export class Status {
  private readonly status: string;

  constructor(status: string) {
    if (!status) {
      throw new Error("Status do pedido é obrigatório");
    }

    if (
      ![
        "init",
        "pendente",
        "entrega",
        "concluido"
      ].includes(status)
    ) throw new Error(`O status ${status} não exite.`)
 
    this.status = status;
  }

  getValue(): string {
    return this.status;
  }
}