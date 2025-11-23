import type { Order } from "../../Entities/Order.domain.entities";
import type { Gateway } from "../../Entities/Gateway.domain.entities";

export interface IOrderRepository {
  init (): Promise<any>
  create (order: Order): Promise<Order|string>;
  views (): Promise<Order[]|string>;
  viewById (id: string): Promise<Order|string>;
  viewByPhone (phone: string): Promise<Order[]|string>;
  viewToday (): Promise<Order[]|string>;
  updateStatusOrder (id: string, status: string): Promise<string>;
  updateStatusPayment (id: string, data: Gateway): Promise<string>;
  delete (id: string): Promise<string>;
}
