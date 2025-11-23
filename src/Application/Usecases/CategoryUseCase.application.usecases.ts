import { injectable, inject } from "tsyringe";
import { Category } from "../../Domain/Entities/Cotegory.domain.entities";
import { CategoryFactory } from "../../Domain/Factory/CategoryFactory.domain.factory";
import { ICategoryRepository } from "../../Domain/Ports/Repositories/ICategoryRepositoryPort.domain.ports.repostories";

interface CategoryRepository extends ICategoryRepository {}

@injectable()
export class CategoryUseCase {
  constructor(
    @inject("ICategoryRepository") private repository: CategoryRepository
  ) {}

  async create (data:Category) {
    const dto = CategoryFactory.save({
      icon: data.icon,
      name: data.name
    });

    return await this.repository.create(dto);
  }

  async views () {
    return await this.repository.views();
  }

  async viewById (id: string) {
    return await this.repository.viewById(id);
  }

  async update (id: string, data: Category) {
    const dto = CategoryFactory.save({
      icon: data.icon,
      name: data.name
    });

    return await this.repository.update(id, dto);
  }

  async delete (id: string) {
    return await this.repository.delete(id);
  }
}
