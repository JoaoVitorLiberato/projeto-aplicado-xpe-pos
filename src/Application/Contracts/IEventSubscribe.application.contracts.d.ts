import { Order } from "../../Domain/Entities/Order.domain.entities";

export interface IEventSubscribe {
  subscribe (callback: (data: Order) => void): Promise<void>;
}
