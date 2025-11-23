import { Op } from "sequelize";
import { Order } from "../../Domain/Entities/Order.domain.entities";
import { IOrderRepository } from "../../Domain/Ports/Repositories/IOrderRepositoryPort.domain.ports.repostories";
import { OrderModel } from "../Database/Models/Order.infrastructure.database.models";
import { ItemsCartModel } from "../Database/Models/ItemsCart.infrastructure.database.models";
import { Gateway } from "../../Domain/Entities/Gateway.domain.entities";

import {
  formatDateToYYYYMMDD,
  formatDateToYYYYMMDDPlusDay,
  timeZone
} from "../../Shared/Utils/FormatDateToYYYYMMDD.shared.utils";

export class OrderRepository implements IOrderRepository {
  private readonly today = formatDateToYYYYMMDD;
  private readonly nextDay = formatDateToYYYYMMDDPlusDay;

  async init ():Promise<any> {
    return new Promise((resolve, reject) => {
      OrderModel.create({
        canal: "web",
        segmento: "delivery",
        status: "init",
        nome: "",
        telefone: "",
        endereco: {},
        mensagem: "",
        pagamento: {},
        analytics: {},
        createdAt: timeZone(),
        updatedAt: timeZone(),
      })
        .then((responseModel) => resolve(responseModel as unknown as Order))
        .catch((error) => {
          console.error("ERROR - OrderRepository - init", error);
          reject(`error-init-order-model`)
        })
    });
  }

  async create (order: Order):Promise<string|Order> {
    return new Promise((resolve, reject) => {
      OrderModel.update(
        {
          ...order,
          status: "pendente",
          updatedAt: timeZone(),
        },
        {
          where: {
            id: order.id
          }
        }
      )
        .then(() => resolve(order.id))
        .catch((error) => {
          console.error("ERROR - OrderRepository - create", error);
          reject(`error-create-order-model`)
        })
    });
  }

  async views (): Promise<Order[]|string> {
    return new Promise((resolve, reject) => {
      OrderModel.findAll({
        include: [{ model: ItemsCartModel }]
      })
        .then((responseModel) => resolve(responseModel as unknown as Order[]))
        .catch((error) => {
          console.error("ERROR - OrderRepository - views", error);
          reject(`error-views-order-model`)
        })
    });
  }

  async viewById (id: string): Promise<Order|string> {
    return new Promise((resolve, reject) => {
      OrderModel.findByPk(id, {
        include: [{ model: ItemsCartModel }]
      })
        .then((responseModel) => resolve(responseModel as unknown as Order))
        .catch((error) => {
          console.error("ERROR - OrderRepository - viewById", error);
          reject(`error-view-by-id-order-model`)
        })
    });
  }

  async viewByPhone (phone: string): Promise<Order[]|string> {
    return new Promise((resolve, reject) => {
      OrderModel.findAll({
        include: [{ model: ItemsCartModel }],
        where: {
          telefone: phone,
          createdAt: {
            [Op.between]: [`${this.today}T04:00:00`, `${this.nextDay}T03:59:59`]
          }
        }
      })
        .then((responseModel) => resolve(responseModel as unknown as Order[]))
        .catch((error) => {
          console.error("ERROR - OrderRepository - viewByPhone", error);
          reject(`error-view-by-phone-order-model`)
        })
    });
  }

  async viewToday (): Promise<Order[]|string> {
    return new Promise((resolve, reject) => {
      OrderModel.findAll({
        include: [{ model: ItemsCartModel }],
        where: {
          createdAt: {
            [Op.between]: [`${this.today}T04:00:00`, `${this.nextDay}T03:59:59`]
          }
        }
      })
        .then((responseModel) => resolve(responseModel as unknown as Order[]))
        .catch((error) => {
          console.error("ERROR - OrderRepository - viewByPhone", error);
          reject(`error-view-by-phone-order-model`)
        })
    });
  }

  async updateStatusOrder (id: string, status: string): Promise<string> {
    return new Promise((resolve, reject) => {
      OrderModel.update({
        status,
        updatedAt: timeZone(),
      }, { where: { id } })
        .then(() => resolve("Pedido atualizado com sucesso."))
        .catch((error) => {
          console.error("ERROR - OrderRepository - update", error);
          reject(`error-update-order-model`)
        })
    });
  }

  async updateStatusPayment (id: string, data: Gateway): Promise<string> {
    return new Promise((resolve, reject) => {
      OrderModel.update({
        pagamento: {
          ...data,
          statusPagamento: "pago"
        },
        updatedAt: timeZone(),
      }, { where: { id } })
        .then(() => resolve("Pedido atualizado com sucesso."))
        .catch((error) => {
          console.error("ERROR - OrderRepository - update", error);
          reject(`error-update-order-model`)
        })
    });
  }

  async delete (id: string): Promise<string> {
    return new Promise((resolve, reject) => {
      OrderModel.destroy({ where: { id } })
        .then(() => resolve("Pedido deletado com sucesso."))
        .catch((error) => {
          console.error("ERROR - OrderRepository - delete", error);
          reject(`error-delete-order-model`)
        })
    });
  }
}