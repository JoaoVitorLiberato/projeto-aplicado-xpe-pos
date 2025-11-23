import { inject, injectable } from "tsyringe";
import { ItemsCartFactory } from "../../Domain/Factory/ItemsCartFactory.domain.factory";
import { ItemsCart } from "../../Domain/Entities/ItemsCart.domain.entities";
import { IItemsCartrRepositoryPort } from "../../Domain/Ports/Repositories/IItemsCartrRepositoryPort.domain.ports.repostories";

interface IItemsCartRepository extends IItemsCartrRepositoryPort {}

@injectable({})
export class ItemsCartUseCase {
  constructor (
    @inject("IItemsCartrRepositoryPort") private repository: IItemsCartRepository
  ) {}

  async create (item: ItemsCart) {
    const dto = ItemsCartFactory.save(item);
    return await this.repository.create(dto);
  }

  async views () {
    return await this.repository.views();
  }

  async viewById (id: string) {
    return await this.repository.viewById(id);
  }

  async update (id:string, item: ItemsCart) {
    const dto = ItemsCartFactory.save(item);
    return await this.repository.update(id, dto);
  }

  async delete (id: string) {
    return await this.repository.delete(id);
  }
}
