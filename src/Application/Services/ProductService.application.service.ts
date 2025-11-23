import { injectable, inject } from "tsyringe";
import { ProductUserCase } from "../Usecases/ProductUserCase.application.usecases";
import { Product } from "../../Domain/Entities/Product.domain.entities";
import { InternalNotificationServiceAdapter } from "../../Infrastructure/Adapters/Internal/Notifications/InternalNotificationAdapter.infrastructure.adapters";
import { ICloudfireBucketPort } from "../../Domain/Ports/Storages/ICloudFirePort.domain.ports.storages";
import { ICategoriesServicesContract } from "../Contracts/ICategoriesServices.application.contracts"

interface IBucket extends ICloudfireBucketPort {}
interface ICategoriesService extends ICategoriesServicesContract {}

@injectable()
export class ProductService {
  constructor (
    private readonly product: ProductUserCase,
    private readonly notification: InternalNotificationServiceAdapter,
    @inject("ICategoriesServicesContract") private readonly category: ICategoriesService,
    @inject("ICloudfireBucketPort") private readonly bucket: IBucket
  ) {}

  async create (product: Product, image: File): Promise<any> {
    try {
      const responseServiceCategory = await this.category.viewById(product.categoryId)

      if (
        [
          responseServiceCategory,
          responseServiceCategory.codigo,
          /^(category-not-found)$/i.test(String(responseServiceCategory.codigo))
        ].every(o => !!o) 
      ) return this.notification.send(responseServiceCategory)

      if (product.tumbnail.upload && image) {
        const responseStorageAdapter = await this.bucket.upload(image)

        if (responseStorageAdapter && responseStorageAdapter.codigo && /^error-upload-image$/.test(responseStorageAdapter.codigo)) {
          return await this.notification.send(responseStorageAdapter)
        }

        product.tumbnail.url = (responseStorageAdapter || { path: "" }).path
      }

      await this.product.save(product);

      return await this.notification.send({
        mensagem: "Produto criado com sucesso."
      });
    } catch (error) {
      console.error("ERROR [ProductService]", error);
      return await this.notification.send({
        codigo: "error-create-product",
        mensagem: "Houve um erro ao salvar o produto"
      });
    }
  }

  async views (): Promise<any> {
    try {
      const responseRepository = await this.product.views();

      if (responseRepository.length === 0) {
        return this.notification.send({
          codigo: "products-not-foud",
          mensagem: "Não há produtos cadastrado no banco de dados."
        })
      }

      return responseRepository
    } catch (error) {
      console.error("ERROR [ProductService]", error);
      return await this.notification.send({
        codigo: "error-views-product",
        mensagem: "Houve um erro ao buscar os produtos"
      });
    }
  }

  async viewById (id: string): Promise<any> {
    try {
      const responseRepository = await this.product.viewById(id);

      if (!responseRepository) {
        return await this.notification.send({
          codigo: "product-not-found",
          mensagem: "Nenhum produto encontrado"
        });
      }

      return responseRepository
    } catch (error) {
      console.error("ERROR [ProductService]", error);
      return await this.notification.send({
        codigo: "error-view-by-id-product",
        mensagem: "Houve um erro ao buscar o produto"
      });
    }
  }

  async update (
    id: string,
    product: Product,
    image: File
  ): Promise<any> {
    try {
      const responseService = await this.viewById(id);

      if (responseService && responseService.codigo) {
        return await this.notification.send(responseService);
      }

      if (product.tumbnail.upload && image) {
        const responseStorageAdapter = await this.bucket.upload(image);

        if (responseStorageAdapter && responseStorageAdapter.codigo && /^error-upload-image$/.test(responseStorageAdapter.codigo)) {
          return await this.notification.send(responseStorageAdapter)
        }

        product.tumbnail.url = (responseStorageAdapter || { path: "" }).path
      }

      await this.product.update(id, product);

      return await this.notification.send({
        mensagem: "Produto atualizado com sucesso"
      });
    } catch (error) {
      console.error("ERROR [ProductService]", error);
      return await this.notification.send({
        codigo: "error-update-product",
        mensagem: "Houve um erro ao atualizar o produto"
      });
    }
  }

  async delete (id: string): Promise<any> {
    try {
      const responseService = await this.viewById(id);

      if (responseService && responseService.codigo) {
        return await this.notification.send(responseService);
      }

      await this.product.delete(id);

      return await this.notification.send({
        mensagem: "Produto deletado com sucesso."
      });
    } catch (error) {
      console.error("ERROR [ProductService]", error);
      return await this.notification.send({
        codigo: "error-delete-product",
        mensagem: "Houve um erro ao deletar o produto"
      });
    }
  }
}