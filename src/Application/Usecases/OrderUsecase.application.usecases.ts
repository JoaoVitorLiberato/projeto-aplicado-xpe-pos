import { inject, injectable } from "tsyringe";
import { OrderFactory } from "../../Domain/Factory/OrderFactory.domain.factory";
import { Order } from "../../Domain/Entities/Order.domain.entities";
import { Gateway } from "../../Domain/Entities/Gateway.domain.entities";
import { IOrderRepository } from "../../Domain/Ports/Repositories/IOrderRepositoryPort.domain.ports.repostories";

interface OrderRepository extends IOrderRepository {}

@injectable({})
export class OrderUseCase {
  constructor (
    @inject("IOrderRepository") private repository: OrderRepository
  ) {}

  async init () {
    return await this.repository.init();
  }

  async create (order: Order) {
    const dto = OrderFactory.save(order);
    return await this.repository.create(dto);
  }

  async views () {
    return await this.repository.views();
  }

  async viewById (id: string) {
    return await this.repository.viewById(id);
  }

  async viewByPhone (phone: string) {
    return await this.repository.viewByPhone(phone);
  }

  async viewToday () {
    return await this.repository.viewToday();
  }

  async updateStatusOrder (id: string, status: string) {
    return await this.repository.updateStatusOrder(id, status);
  }

  async updateStatusPayment (id: string, data: Gateway) {
    return await this.repository.updateStatusPayment(id, data);
  }

  async delete (id: string) {
    return await this.repository.delete(id);
  }
}

