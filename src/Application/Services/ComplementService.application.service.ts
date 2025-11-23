import { injectable } from "tsyringe";
import { ComplementUseCase } from "../Usecases/ComplementUseCase.application.usecases";
import { Complement } from "../../Domain/Entities/Complement.domain.entities";
import { InternalNotificationServiceAdapter } from "../../Infrastructure/Adapters/Internal/Notifications/InternalNotificationAdapter.infrastructure.adapters"      ;

@injectable()
export class ComplementService {
  constructor(
    private readonly complement: ComplementUseCase,
    private readonly notify: InternalNotificationServiceAdapter
  ) {}

  async create (data: Complement): Promise<any> {
    try {
      await this.complement.create(data);
      return await this.notify.send({
        mensagem: "Complemento criado com sucesso.",
      });
    } catch (error) {
      console.error("[ERROR ComplementService]", error);
      return await this.notify.send({
        codigo: "error-create-complement",
        mensagem: "Erro ao criar complemento",
      });
    }
  }

  async views (): Promise<any> {
    try {
      return await this.complement.views();
    } catch (error) {
      console.error("[ERROR ComplementService]", error);
      return await this.notify.send({
        codigo: "error-views-complement",
        mensagem: "Erro ao buscar complementos",
      });
    }
  }

  async viewById(id: string): Promise<any> {
    try {
      const responseRepository = await this.complement.viewById(id);

      if (!responseRepository) {
        return await this.notify.send({
          codigo: "complement-not-found",
          mensagem: "Complemento não encontrado",
        });
      }

      return responseRepository;
    } catch (error) {
      console.error("[ERROR ComplementService]", error);
      return await this.notify.send({
        codigo: "error-view-complement",
        mensagem: "Erro ao buscar complemento",
      });
    }
  }

  async update(id: string, data: Complement): Promise<any> {
    try {
      const responseService = await this.viewById(id);

      if (
        [
          responseService,
          responseService.codigo,
          /^(complement-not-found)$/i.test(String(responseService.codigo))
        ].every(o => !!o)
      ) return await this.notify.send(responseService);

      await this.complement.update(id, data);

      return await this.notify.send({
        mensagem: "Complemento atualizado com sucesso.",
      });
    } catch (error) {
      console.error("[ERROR ComplementService]", error);
      return await this.notify.send({
        codigo: "error-update-complement",
        mensagem: "Erro ao atualizar complemento",
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
          /^(complement-not-found)$/i.test(String(responseService.codigo))
        ].every(o => !!o)
      ) return await this.notify.send(responseService);

      await this.complement.delete(id);

      return await this.notify.send({
        mensagem: "Complemento deletado com sucesso.",
      });
    } catch (error) {
      console.error("[ERROR ComplementService]", error);
      return await this.notify.send({
        codigo: "error-delete-complement",
        mensagem: "Erro ao deletar complemento",
      });
    }
  }
} 