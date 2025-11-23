import { injectable, inject } from "tsyringe";
import { Complement } from "../../Domain/Entities/Complement.domain.entities";
import { ComplementFactory } from "../../Domain/Factory/ComplementFactory.domain.factory";
import { IComplementRepository } from "../../Domain/Ports/Repositories/IComplementRepositoryPort.domain.ports.repostories";

interface ComplementRepository extends IComplementRepository {}

@injectable()
export class ComplementUseCase {
  constructor(
    @inject("IComplementRepository") private repository: ComplementRepository
  ) {}

  async create (data:Complement) {
    const dto = ComplementFactory.save({
      name: data.name,
      description: data.description,
      price: Number(data.price),
      total: Number(data?.total),
      quantity: Number(data?.quantity)
    });

    return await this.repository.create(dto);
  }

  async views () {
    return await this.repository.views();
  }

  async viewById (id: string) {
    return await this.repository.viewById(id);
  }

  async update (id: string, data: Complement) {
    const dto = ComplementFactory.save({
      name: data.name,
      description: data.description,
      price: Number(data.price),
      total: Number(data?.total),
      quantity: Number(data?.quantity)
    });

    return await this.repository.update(id, dto);
  }

  async delete (id: string) {
    return await this.repository.delete(id);
  }
}
