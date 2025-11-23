import { injectable } from "tsyringe";
import { CategoryUseCase } from "../Usecases/CategoryUseCase.application.usecases";
import { Category } from "../../Domain/Entities/Cotegory.domain.entities";
import { InternalNotificationServiceAdapter } from "../../Infrastructure/Adapters/Internal/Notifications/InternalNotificationAdapter.infrastructure.adapters"      ;
import { ICategoriesServicesContract } from "../Contracts/ICategoriesServices.application.contracts"

@injectable()
export class CategoryService implements ICategoriesServicesContract {
  constructor(
    private readonly category: CategoryUseCase,
    private readonly notify: InternalNotificationServiceAdapter
  ) {}

  async create (data: Category): Promise<any> {
    try {
      await this.category.create(data);
      return await this.notify.send({
        mensagem: "Categoria criada com sucesso.",
      });
    } catch (error) {
      console.error("[ERROR CategoryService]", error);
      return await this.notify.send({
        codigo: "error-create-category",
        mensagem: "Erro ao criar categoria",
      });
    }
  }

  async views (): Promise<any> {
    try {
      const responseRepository = await this.category.views()
      if (responseRepository.length === 0) {
        return this.notify.send({
          codigo: "categories-not-found",
          mensagem: "Não há nenhuma categoria cadastrada em nosso banco de dados."
        })
      }

      return responseRepository;
    } catch (error) {
      console.error("[ERROR CategoryService]", error);
      return await this.notify.send({
        codigo: "error-views-category",
        mensagem: "Erro ao buscar categorias",
      });
    }
  }

  async viewById(id: string): Promise<any> {
    try {
      const responseRepository = await this.category.viewById(id);
        
      if (/^(error-view-category-model)$/i.test(String(responseRepository)))
        throw new Error(String(responseRepository))

      if (!responseRepository) {
        return await this.notify.send({
          codigo: "category-not-found",
          mensagem: "Categoria não encontrada",
        });
      }

      return responseRepository;
    } catch (error) {
      console.error("[ERROR CategoryService]", error);
      return await this.notify.send({
        codigo: "error-view-category",
        mensagem: "Erro ao buscar categoria",
      });
    }
  }

  async update(id: string, data: Category): Promise<any> {
    try {
      const responseService = await this.viewById(id);

      if (
        [
          responseService,
          responseService.codigo,
          /^(category-not-found)$/i.test(String(responseService.codigo))
        ].every(o => !!o)
      ) return await this.notify.send(responseService);

      await this.category.update(id, data);

      return await this.notify.send({
        mensagem: "Categoria atualizada com sucesso.",
      });
    } catch (error) {
      console.error("[ERROR CategoryService]", error);
      return await this.notify.send({
        codigo: "error-update-category",
        mensagem: "Erro ao atualizar categoria",
      });
    }
  }

  async delete(id: string): Promise<any> {
    try {
      const responseService = await this.viewById(id);

      if (
        [
          responseService,
          responseService.codigo,
          /^(category-not-found)$/i.test(String(responseService.codigo))
        ].every(o => !!o)
      ) return await this.notify.send(responseService);

      await this.category.delete(id);

      return await this.notify.send({
        mensagem: "Categoria deletada com sucesso.",
      });
    } catch (error) {
      console.error("[ERROR CategoryService]", error);
      return await this.notify.send({
        codigo: "error-delete-category",
        mensagem: "Erro ao deletar categoria",
      });
    }
  }
} 