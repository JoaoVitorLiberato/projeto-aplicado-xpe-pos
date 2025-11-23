export class Order {
  constructor (
    public id: string,
    public canal: string,
    public nome: string,
    public segmento: string,
    public status: string,
    public telefone: string,
    public mensagem: string,
    public pagamento: {
      desconto: number
      formaPagamento: string,
      statusPagamento: string,
      valorFrete: number,
      valorProdutos: number,
      valorTotal: number,
      recebido?: {
        capture_method: string,
        transaction_id: string,
        slug: string,
        order_nsu: string,
        receipt_url: string
      }
    },
    public endereco: {
      cep: string,
      logradouro: string,
      bairro: string,
      cidade: string,
      uf: string,
      numero: string,
      complemento: string,
      referencia: string
    },
    public analytics: {
      source: string,
      medium: string,
      campaign: string,
      params: Record<string, string|number|boolean>
    },
    public createdAt?: string,
    public updatedAt?: string,
  ) {}
}
