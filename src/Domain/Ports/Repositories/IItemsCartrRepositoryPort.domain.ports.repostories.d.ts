import type { ItemsCart } from "../../Entities/ItemsCart.domain.entities";

export interface IItemsCartrRepositoryPort {
  create (item: ItemsCart): Promise<ItemsCart|string>
  views (): Promise<ItemsCart[]|string>
  viewById (id:string): Promise<ItemsCart|string>
  update (id:string, item: ItemsCart): Promise<string|string>
  delete (id: string): Promise<string|string>
}
