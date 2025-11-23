import { Gateway } from "../Entities/Gateway.domain.entities"; 
import { Gateway as GatewayValidate } from "../Validators/Gateway.domain.validators";

export class GatewayFactory {
  static save (props: Gateway): Gateway {
    const INFINITY = new GatewayValidate(props).getValue()

    return new Gateway(
      INFINITY.transaction_id,
      INFINITY.slug,
      INFINITY.order_nsu,
      INFINITY.capture_method,
      INFINITY.receipt_url
    );
  }
}