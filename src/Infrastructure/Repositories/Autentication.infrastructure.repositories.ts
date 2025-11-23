import { IAutenticationRepository } from "../../Domain/Ports/Repositories/IAuthenticationRepositoryPort.domain.ports.repostories";
import { UserModel } from "../Database/Models/User.infrastructure.database.models";
import { User } from "../../Domain/Entities/User.domain.entities";

export class AutenticationRepository implements IAutenticationRepository {
  async login (email: string): Promise<User|string> {
    return new Promise((resolve, reject) => {
      UserModel.findOne({ where: { email } })
        .then((responseService) => {
          if (!responseService) reject("user-not-found");

          resolve(responseService as unknown as User);
        }).catch((error) => {
          console.error("[ERROR AutenticationRepository]", error);
          reject("error-login-user-model");
        })
    })
  }
}