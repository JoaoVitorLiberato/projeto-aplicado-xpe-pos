import { Category } from "../../Domain/Entities/Cotegory.domain.entities"

export interface ICategoriesServicesContract {
  viewById: (id:string) => Promise<Category|any>
}
