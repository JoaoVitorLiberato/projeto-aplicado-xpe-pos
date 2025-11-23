import type { Product } from "../../Entities/Product.domain.entities";

export interface IProductRepository {
  create (product: Product): Promise<string>;
  views(): Promise<Product[]|string>;
  viewById(id: string): Promise<Product|string>;
  update(id: string, product: Product): Promise<string>;
  delete(id: string): Promise<string>;
}
