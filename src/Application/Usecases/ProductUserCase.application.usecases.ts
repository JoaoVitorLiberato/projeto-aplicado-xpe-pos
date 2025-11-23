import { inject, injectable } from "tsyringe";
import { ProductFactory } from "../../Domain/Factory/ProductFactory.domain.factory";
import { Product } from "../../Domain/Entities/Product.domain.entities";
import { IProductRepository } from "../../Domain/Ports/Repositories/IProductRepositoryPort.domain.ports.repostories";

interface ProductRepository extends IProductRepository {}

@injectable()
export class ProductUserCase {
  constructor (
    @inject("IProductRepository") private repository: ProductRepository
  ) {}

  async save (product: Product): Promise<string> {
    const dto = ProductFactory.save({
      tumbnail: {
        url: product.tumbnail.url,
        upload: product.tumbnail.upload,
      },
      categoryId: product.categoryId,
      name: product.name,
      description: product.description,
      price: product.price,
      differences: product.differences,
      note_client: product.note_client,
    });

    return await this.repository.create(dto);
  }

  async views (): Promise<Product[]|string> {
    return await this.repository.views();
  }

  async viewById (id: string): Promise<Product|string> {
    return await this.repository.viewById(id);
  }

  async update (id: string, product: Product): Promise<string> {
    const dto = ProductFactory.save({
      tumbnail: {
        url: product.tumbnail.url,
        upload: product.tumbnail.upload,
      },
      categoryId: product.categoryId,
      name: product.name,
      description: product.description,
      price: product.price,
      differences: product.differences,
      note_client: product.note_client,
    });
    return await this.repository.update(id, dto);
  }

  async delete (id: string): Promise<string> {
    return await this.repository.delete(id);
  }
}