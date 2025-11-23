import { injectable } from "tsyringe";
import { ItemsCart } from "../../Domain/Entities/ItemsCart.domain.entities";
import { ItemsCartUseCase } from "../Usecases/ItemsCartUsecase.application.usecases";
import { InternalNotificationServiceAdapter } from "../../Infrastructure/Adapters/Internal/Notifications/InternalNotificationAdapter.infrastructure.adapters";

@injectable()
export class ItemsCartService {
  constructor (
    private readonly service: ItemsCartUseCase,
    private readonly notify: InternalNotificationServiceAdapter,
  ) {}

  async views (): Promise<any> {
    try {
      const responseRepository = await this.service.views();

      if (responseRepository.length === 0) {
        return await this.notify.send({
          codigo: "items-cart-not-fount",
          mensagem: "Pedidos não encontrado.",
        });
      }

      return await this.notify.send(responseRepository);
    } catch (error) {
      return await this.notify.send({
        codigo: "error-views-items-cart",
        mensagem: "Houve um erro ao buscar os itens dos pedidos cadastrados no banco de dados. ",
      });
    }
  }

  async create (item: ItemsCart): Promise<any> {
    try {
      const responseRepository = await this.service.create(item);

      return await this.notify.send({
        mensagem: "Item adicionado com sucesso",
        data: responseRepository
      });
    } catch (error) {
      console.error("[ERROR ItemsCartService - create]", error);
      return await this.notify.send({
        codigo: "error-create-items-cart",
        mensagem: "Houve um erro ao adicionar item ao carrinho.",
      });
    }
  }

  async viewById (id:string): Promise<any> {
    try {
      const ResponseRepository = await this.service.viewById(id);

      if (!ResponseRepository) {
        return await this.notify.send({
          codigo: "item-cart-not-fount",
          mensagem: "O item não foi encontrado em nosso banco de dados.",
        });
      }

      return await this.notify.send(ResponseRepository);
    } catch (error) {
      console.error("[ERROR ItemsCartService - viewById]", error);
      return await this.notify.send({
        codigo: "error-find-by-items-cart",
        mensagem: "Houve um erro ao encontrar o item em nosso banco de dados.",
      });
    }
  }

  async update (id:string, item:ItemsCart): Promise<any> {
    try {
      const ResponseService = await this.viewById(id);

      if (ResponseService && ResponseService.codigo) {
        return await this.notify.send(ResponseService);
      }

      await this.service.update(id, item)

      return await this.notify.send({
        mensagem: "Item atualizado com sucesso."
      });
    } catch (error) {
      console.error("[ERROR ItemsCartService - update]", error);
      return await this.notify.send({
        codigo: "error-update-items-cart",
        mensagem: "Houve um erro ao tentar atualizar o pedido.",
      });
    }
  }

  async delete (id:string): Promise<any> {
    try {
      const ResponseService = await this.viewById(id);

      if (ResponseService && ResponseService.codigo) {
        return await this.notify.send(ResponseService);
      }

      await this.service.delete(id)

      return await this.notify.send({
        mensagem: "Item deletado com sucesso."
      });
    } catch (error) {
      console.error("[ERROR ItemsCartService - delete]", error);
      return await this.notify.send({
        codigo: "error-delete-items-cart",
        mensagem: "Houve um erro ao tentar deletar o pedido.",
      });
    }
  }
}