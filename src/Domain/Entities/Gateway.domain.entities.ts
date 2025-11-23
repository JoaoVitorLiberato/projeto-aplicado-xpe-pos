export class Gateway {
  constructor(
    public transaction_id: string,
    public slug: string,
    public order_nsu: string,
    public capture_method: string,
    public receipt_url: string
  ) {}
}
