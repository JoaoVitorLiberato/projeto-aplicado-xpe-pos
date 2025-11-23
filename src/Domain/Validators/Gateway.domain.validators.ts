export class Gateway {
  private readonly gateway: {
    transaction_id: string,
    slug: string,
    order_nsu: string,
    capture_method: string,
    receipt_url: string
  }

  constructor (
    gateway: {
      transaction_id: string,
      slug: string,
      order_nsu: string,
      capture_method: string,
      receipt_url: string
    }
  ) {
    if (!gateway.transaction_id || typeof gateway.transaction_id !== 'string' || gateway.transaction_id.trim() === '') {
      throw new Error("Transaction ID é obrigatório");
    }
  
    if (!gateway.slug || typeof gateway.slug !== 'string' || gateway.slug.trim() === '') {
      throw new Error("Slug é obrigatório");
    }
  
    if (!gateway.order_nsu || typeof gateway.order_nsu !== 'string' || gateway.order_nsu.trim() === '') {
      throw new Error("Order NSU é obrigatório");
    }

    if (!gateway.capture_method || typeof gateway.capture_method !== 'string' || gateway.capture_method.trim() === '') {
      throw new Error("Capture Method é obrigatório");
    }

    if (!gateway.receipt_url || typeof gateway.receipt_url !== 'string' || gateway.receipt_url.trim() === '') {
      throw new Error("Receipt URL é obrigatório");
    }

    this.gateway = gateway
  }

  getValue() {
    return this.gateway;
  }
}