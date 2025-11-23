import { Order } from "../../Domain/Entities/Order.domain.entities";

export interface IEventPublish {
  publish (data: Order): Promise<void>;
}