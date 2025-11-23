import { Product } from "../../Domain/Entities/Product.domain.entities";
import { ProductModel } from "../Database/Models/Product.infrastructure.database.models";
import { IProductRepository } from "../../Domain/Ports/Repositories/IProductRepositoryPort.domain.ports.repostories";
import { CategoryModel } from "../Database/Models/Category.infrastructure.database.models";

export class ProductRepository implements IProductRepository {
  async create (product: Product): Promise<string> {
    return new Promise((resolve, reject) => {
      ProductModel.create({ ...product })
      .then(() => resolve("Produto salvo com sucesso"))
      .catch((error) => {
        console.error("ERROR [ProductRepository - create]", error);
        reject("error-save-product-model")
      })
    })
  }

  async views (): Promise<Product[]|string> {
    return new Promise((resolve, reject) => {
      ProductModel.findAll({
        include: [{ model: CategoryModel }]
      })
      .then((responseModel) => resolve(responseModel as unknown as Product[]))
      .catch((error) => {
        console.error("ERROR [ProductRepository - views]", error);
        reject("error-views-product-model")
      })
    })
  }

  async viewById (id: string): Promise<Product|string> {
    return new Promise((resolve, reject) => {
      ProductModel.findByPk(id, {
        include: [{ model: CategoryModel }]
      })
      .then((responseModel) => resolve(responseModel as unknown as Product))
      .catch((error) => {
        console.error("ERROR [ProductRepository - viewById]", error);
        reject("error-view-by-id-product-model")
      })
    })
  }

  async update (id: string, product: Product): Promise<string> {
    return new Promise((resolve, reject) => {
      ProductModel.update(product, { where: { id } })
      .then(() => resolve("Produto atualizado com sucesso"))
      .catch((error) => {
        console.error("ERROR [ProductRepository - update]", error);
        reject("error-update-product-model")
      })
    })
  }

  async delete (id: string): Promise<string> {
    return new Promise((resolve, reject) => {
      ProductModel.destroy({ where: { id } })
      .then(() => resolve("Produto deletado com sucesso"))
      .catch((error) => {
        console.error("ERROR [ProductRepository - delete]", error);
        reject("error-delete-product-model")
      })
    })
  }
}