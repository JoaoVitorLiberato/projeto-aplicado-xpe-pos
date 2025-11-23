export class ItemsCart {
  constructor (
    public name: string,
    public price: {
      default: number,
      discount: {
        status: boolean,
        percentage: number
      },
    },
    public quantity: number,
    public total: number,
    public complements: Array<{
      id: string,
      name: string,
      price: number,
      quantity: number,
    }>,
    public orderId: string,
    public differences?: {
      [key:string]: {
        status: boolean,
        value: number
      }
    },
    public id?: string,
  ) {
    this.calculate()
  }

  private calculate (): void {
    let final_price_item = this.price.default;  
    let price_complements = 0;

    this.complements
      .forEach((complement) => {
        if (!complement) return
        price_complements += (complement.price * complement.quantity);
      });

    const DIFFERENCES = this.differences ?? {}
    if (DIFFERENCES && DIFFERENCES[Object.keys(DIFFERENCES)[0]]?.status) {
      final_price_item += DIFFERENCES[Object.keys(DIFFERENCES)[0]]?.value
    }

    if (this.price.discount.status) {
      const discountPercentage = this.price.discount.percentage / 100
      final_price_item = final_price_item * (1 - discountPercentage)
    }

    this.total = (Math.round(final_price_item) * this.quantity) + price_complements
  }
}
