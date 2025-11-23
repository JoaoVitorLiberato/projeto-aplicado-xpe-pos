import { ItemsCart } from "../../Domain/Entities/ItemsCart.domain.entities";
import { IItemsCartrRepositoryPort } from "../../Domain/Ports/Repositories/IItemsCartrRepositoryPort.domain.ports.repostories";
import { ItemsCartModel } from "../Database/Models/ItemsCart.infrastructure.database.models";
import { OrderModel } from "../Database/Models/Order.infrastructure.database.models";

import {
  timeZone
} from "../../Shared/Utils/FormatDateToYYYYMMDD.shared.utils";

export class ItemsCartRepository implements IItemsCartrRepositoryPort {
  async create (item: ItemsCart):Promise<ItemsCart> {
    return new Promise((resolve, reject) => {
      ItemsCartModel.create({
        ...item,
        createdAt: timeZone(),
        updatedAt: timeZone(),
      })
        .then((responseModel) => resolve(responseModel as unknown as ItemsCart))
        .catch((error) => {
          console.error("ERROR - ItemCartRepository - create", error);
          reject(`error-create-item-model`)
        })
    });
  }

  async views (): Promise<ItemsCart[]> {
    return new Promise((resolve, reject) => {
      ItemsCartModel.findAll({
        include: [{ model: OrderModel }]
      })
      .then((responseModel) => resolve(responseModel as unknown as ItemsCart[]))
      .catch((error) => {
        console.error("[ERROR - ItemsCartRepository] - views", error)
        reject("error-views-item-model")
      })
    })
  }

  async viewById (id:string): Promise<ItemsCart> {
    return new Promise((resolve, reject) => {
      ItemsCartModel.findByPk(id, {
        include: [{ model: OrderModel }]
      })
      .then((responseModel) => resolve(responseModel as unknown as ItemsCart))
      .catch((error) => {
        console.error("[ERROR - ItemsCartRepository] - viewById", error)
        reject("error-view-by-id-item-model")
      })
    })
  }

  async update (id:string, item: ItemsCart): Promise<string> {
    return new Promise((resolve, reject) => {
      ItemsCartModel.update(
        { ...item },
        { where: { id }}
      )
      .then(() => resolve("Item atualizado com sucesso!"))
      .catch((error) => {
        console.error("[ERROR - ItemsCartRepository] - update", error)
        reject("error-update-item-model")
      })
    })
  }

  async delete (id: string): Promise<string> {
    return new Promise((resolve, reject) => {
      ItemsCartModel.destroy({
        where: { id }
      })
      .then(() => resolve("Item deletado com sucesso!"))
      .catch((error) => {
        console.error("[ERROR - ItemsCartRepository] - delete", error)
        reject("error-delete-item-model")
      })
    })
  }
}
