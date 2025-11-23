import { ItemsCart } from "../Entities/ItemsCart.domain.entities";
import { Name } from "../Validators/Name.domain.validators";
import { Price } from "../Validators/Price.domain.validators";

export class ItemsCartFactory {
  static save (props: ItemsCart): ItemsCart {
    const QUANTITY = props.quantity;
    const TOTAL = new Price(props.total).getValue();
    const COMPLEMNTS = props.complements;
    const DIFFERENCES = props.differences ?? {};
    const ORDER_ID = props.orderId;
    const NAME = new Name(props.name).getValue();
    const PRICE = {
      default: new Price(props.price.default).getValue(),
      discount: {
        status: props.price.discount.status,
        percentage: props.price.discount.percentage
      }
    };

    return new ItemsCart(
      NAME,
      PRICE,
      QUANTITY,
      TOTAL,
      COMPLEMNTS,
      ORDER_ID,
      DIFFERENCES
    );
  }
}
