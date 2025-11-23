import type { Category } from "../../Entities/Cotegory.domain.entities";

export interface ICategoryRepository {
  create: (complement: Category) => Promise<Category|string>;
  views: () => Promise<Category[]|string>;
  viewById: (id: string) => Promise<Category|string>;
  update: (id: string, data: Category) => Promise<Category|string>;
  delete: (id: string) => Promise<string>;
}
