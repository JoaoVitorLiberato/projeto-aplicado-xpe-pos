import { Gateway } from "../../Domain/Entities/Gateway.domain.entities";
import { Order } from "../../Domain/Entities/Order.domain.entities";

export interface IOrderServicesContract {
  viewById (id: string): Promise<Order|null>;
  updateStatusPayment (id: string, data: Gateway): Promise<any>;
}