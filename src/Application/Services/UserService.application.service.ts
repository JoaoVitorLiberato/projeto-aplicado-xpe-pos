import { injectable, inject } from "tsyringe";
import { User } from "../../Domain/Entities/User.domain.entities";
import { UserUseCase } from "../Usecases/UserUseCase.application.usecases";
import { InternalNotificationServiceAdapter } from "../../Infrastructure/Adapters/Internal/Notifications/InternalNotificationAdapter.infrastructure.adapters";
import { ICloudfireBucketPort } from "../../Domain/Ports/Storages/ICloudFirePort.domain.ports.storages";

interface IBucket extends ICloudfireBucketPort {}

@injectable()
export class UserService {
  constructor (
    private readonly user: UserUseCase,
    private readonly notification: InternalNotificationServiceAdapter,
    @inject("ICloudfireBucketPort") private readonly bucket: IBucket
  ) {}

  async create (user: User, image: File): Promise<any> {
    try {
      if (user.details.thumbnail?.upload) {
        try {
          const responseStorageAdapter = await this.bucket.upload(image as File)
          if ([
            responseStorageAdapter,
            responseStorageAdapter.codigo,
              /^error-upload-image$/.test(String(responseStorageAdapter.codigo))
            ].every(o => !!o)
          ) throw Error("Houve um erro ao tentar fazer o upload")
    
          user.details.thumbnail.url = (responseStorageAdapter || { path: "" }).path
        } catch (error) {
          console.error("[ERROR - UPLOAD USER]", error)
        }
      }

      const responseRepository = await this.user.create(user);

      if (/^(email-already-exist-model)$/i.test(String(responseRepository))) {
        return await this.notification.send({
          codigo: "email-already-exist",
          mensagem: "Esse email já existe em nosso banco de dados."
        });
      }

      return await this.notification.send({
        mensagem: "Usuário criado com sucesso."
      });
    } catch (error) {
      console.error("[ERROR - UserService create]", error);
      return await this.notification.send({
        codigo: "erro-create-user",
        mensagem: "Houve um erro ao tentar criar um novo usuário"
      });
    }
  }

  async views (): Promise<any> {
    try {
      const responseRepository = await this.user.views();

      return await this.notification.send(responseRepository);
    } catch (error) {
      console.error("[ERROR - UserService views]", error);
      return await this.notification.send({
        codigo: "error-find-users",
        mensagem: "Houve erro ao visualizar os usuários"
      });
    }
  }

  async viewById (id:string): Promise<any> {
    try {
      const responseRepository = await this.user.viewById(id);

      if (!responseRepository) {
        return await this.notification.send({
          codigo: "user-not-found",
          mensagem: "O usuário não foi encontrado."
        })
      }

      return await this.notification.send(responseRepository);
    } catch (error) {
      console.error("[ERROR - UserService views]", error);
      return await this.notification.send({
        codigo: "error-find-by-user",
        mensagem: "Houve erro ao visualizar o usuário"
      });
    }
  }

  async update (id:string, user: User, image: File): Promise<any> {
    try {
      const responseService = await this.viewById(id);

      if (responseService && responseService.codigo) {
        return await this.notification.send(responseService);
      }

      if (user.details.thumbnail?.upload) {
        try {
          const responseStorageAdapter = await this.bucket.upload(image as File)
          if ([
            responseStorageAdapter,
            responseStorageAdapter.codigo,
              /^error-upload-image$/.test(String(responseStorageAdapter.codigo))
            ].every(o => !!o)
          ) throw Error("Houve um erro ao tentar fazer o upload")
    
          user.details.thumbnail.url = (responseStorageAdapter || { path: "" }).path
        } catch (error) {
          console.error("[ERROR - UPLOAD USER]", error)
        }
      }

      const responseRepository = await this.user.update(id, user);

      if (/^(email-already-exist-model)$/i.test(String(responseRepository))) {
        return await this.notification.send({
          codigo: "email-already-exist",
          mensagem: "Esse email já existe em nosso banco de dados."
        });
      }

      return await this.notification.send({
        mensagem: "Usuário atualizado com sucesso."
      });
    } catch (error) {
      console.error("[ERROR - UserService create]", error);
      return await this.notification.send({
        codigo: "erro-update-user",
        mensagem: "Houve um erro ao tentar atualizar o usuário"
      });
    }
  }

  async delete (id:string): Promise<any> {
    try {
      const responseService = await this.viewById(id);

      if (responseService && responseService.codigo) {
        return await this.notification.send(responseService);
      }

      await this.user.delete(id);

      return await this.notification.send({
        mensagem: "Usuário deletado com sucesso."
      });
    } catch (error) {
      console.error("[ERROR - UserService create]", error);
      return await this.notification.send({
        codigo: "erro-delete-user",
        mensagem: "Houve um erro ao tentar deletar o usuário"
      });
    }
  }
}