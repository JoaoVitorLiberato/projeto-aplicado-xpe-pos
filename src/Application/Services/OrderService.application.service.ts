import { injectable } from "tsyringe";

import { Order } from "../../Domain/Entities/Order.domain.entities";
import { OrderUseCase } from "../Usecases/OrderUsecase.application.usecases";
import { InternalNotificationServiceAdapter } from "../../Infrastructure/Adapters/Internal/Notifications/InternalNotificationAdapter.infrastructure.adapters";
import { RedisPublish } from "../../Infrastructure/Redis/RedisPublish.infrastructure.redis";
import { IOrderServicesContract } from "../Contracts/IOrderServicesContract.application.contracts";
import { Gateway } from "../../Domain/Entities/Gateway.domain.entities";

@injectable()
export class OrderService implements IOrderServicesContract {
  constructor (
    private readonly service: OrderUseCase,
    private readonly notify: InternalNotificationServiceAdapter,
    private readonly redisPublish: RedisPublish,
  ) {}

  async init (): Promise<any> {
    try {
      const responseRepository = await this.service.init();

      return await this.notify.send({
        mensagem: "Pedido iniciado com sucesso.",
        data: {
          id: responseRepository.id as string,
        }
      });
    } catch (error) {
      console.error("[ERROR OrderService - init]", error);
      return await this.notify.send({
        codigo: "erro-init-order",
        mensagem: "Houve um erro ao tentar iniciar um novo pedido.",
      });
    }
  }

  async create (order: Order): Promise<any> {
    try {
      const responseRepository = await this.service.create(order);

      const responseCacheRepository = await this.service.viewById(order.id);
      console.log("responseCacheRepository", responseCacheRepository)
      await this.redisPublish.publish(responseCacheRepository as Order);

      return await this.notify.send({
        mensagem: "Pedido criado com sucesso",
        data: {
          id: responseRepository as string,
        }
      });
    } catch (error) {
      console.error("[ERROR OrderService - create]", error);
      return await this.notify.send({
        codigo: "erro-create-order",
        mensagem: "Houve um erro ao tentar criar um pedido",
      });
    }
  }

  async views (): Promise<any> {
    try {
      const responseRepository = await this.service.views();

      return responseRepository;
    } catch (error) {
      console.error("[ERROR OrderService - views]", error);
      return await this.notify.send({
        codigo: "erro-views-order",
        mensagem: "Houve um erro ao tentar visualizar os pedidos",
      });
    }
  }

  async viewById (id: string): Promise<any> {
    try {
      const responseRepository = await this.service.viewById(id);
      if (/^(error-view-by-id-order-model)$/i.test(String(responseRepository))) throw new Error("Houve um erro ao tentar visualizar o pedido.");

      if (!responseRepository) {
        return await this.notify.send({
          codigo: "order-not-found",
          mensagem: "Pedido não encontrado.",
        });
      }

      return responseRepository;
    } catch (error) {
      console.error("[ERROR OrderService - viewById]", error);
      return await this.notify.send({
        codigo: "erro-view-by-id-order",
        mensagem: "Houve um erro ao tentar visualizar o pedido.",
      });
    }
  }

  async viewByPhone (phone: string): Promise<any> {
    try {
      const responseRepository = await this.service.viewByPhone(phone);

      if (!responseRepository) {
        return await this.notify.send({
          codigo: "order-not-found",
          mensagem: "Pedido não encontrado.",
        });
      }

      return responseRepository;
    } catch (error) {
      console.error("[ERROR OrderService - viewByPhone]", error);
      return await this.notify.send({
        codigo: "erro-view-by-phone-order",
        mensagem: "Houve um erro ao tentar visualizar o pedido.",
      });
    }
  }

  async viewToday (): Promise<any> {
    try {
      const responseRepository = await this.service.viewToday();

      return responseRepository;
    } catch (error) {
      console.error("[ERROR OrderService - viewToday]", error);
      return await this.notify.send({
        codigo: "erro-view-today-order",
        mensagem: "Houve um erro ao tentar visualizar o pedido.",
      });
    }
  }

  async updateStatusOrder (id: string, status:string): Promise<any> {
    try {
      const responseCacheRepository = await this.service.viewById(id);
      if (/^(error-view-by-id-order-model)$/i.test(String(responseCacheRepository))) throw new Error("Houve um erro ao tentar visualizar o pedido.");

      if (!responseCacheRepository) {
        return await this.notify.send({
          codigo: "order-not-found",
          mensagem: "Pedido não encontrado.",
        });
      }

      const responseRepository = await this.service.updateStatusOrder(id, status);

      return await this.notify.send({
        mensagem: "Pedido atualizado com sucesso."
      });
    } catch (error) {
      console.error("[ERROR OrderService - update]", error);
      return await this.notify.send({
        codigo: "erro-update-order",
        mensagem: "Houve um erro ao tentar atualizar o pedido.",
      });
    }
  }

  async updateStatusPayment (id: string, dataPayment: Gateway): Promise<any> {
    try {
      const responseCacheRepository = await this.service.viewById(id);

      if (!responseCacheRepository) {
        return await this.notify.send({
          codigo: "order-not-found",
          mensagem: "Pedido não encontrado.",
        });
      }

      const responseRepository = await this.service.updateStatusPayment(id, dataPayment);
      if (/^(error-update-order-model)$/i.test(String(responseRepository))) throw new Error("Houve um erro ao tentar atualizar o pedido.");

      return await this.notify.send({
        mensagem: "Pedido atualizado com sucesso."
      });
    } catch (error) {
      console.error("[ERROR OrderService - update]", error);
      return await this.notify.send({
        codigo: "erro-update-order",
        mensagem: "Houve um erro ao tentar atualizar o pedido.",
      });
    }
  }

  async delete (id: string): Promise<any> {
    try {
      const responseCacheRepository = await this.service.viewById(id);
      if (/^(error-view-by-id-order-model)$/i.test(String(responseCacheRepository))) throw new Error("Houve um erro ao tentar visualizar o pedido.");

      if (!responseCacheRepository) {
        return await this.notify.send({
          codigo: "order-not-found",
          mensagem: "Pedido não encontrado.",
        });
      }

      const responseRepository = await this.service.delete(id);
      if (/^(error-delete-order-model)$/i.test(String(responseRepository))) throw new Error("Houve um erro ao tentar deletar o pedido.");

      return await this.notify.send({
        mensagem: "Pedido deletado com sucesso."
      });
    } catch (error) {
      console.error("[ERROR OrderService - delete]", error);
      return await this.notify.send({
        codigo: "erro-delete-order",
        mensagem: "Houve um erro ao tentar deletar o pedido.",
      });
    }
  }
}