import { Order } from "../../Entities/Order.domain.entities";

export interface IGatewayPort {
  create (order: Order): Promise<any>;
  validate (data: any): Promise<any>;
}