import { inject, injectable } from "tsyringe";
import { Authentication } from "../../Domain/Entities/Autentication.domain.entities";
import { AuthenticationFactory } from "../../Domain/Factory/AuthenticateFactory.domain.factory";
import { IAutenticationRepository } from "../../Domain/Ports/Repositories/IAuthenticationRepositoryPort.domain.ports.repostories";

interface AutenticationRepository extends IAutenticationRepository{}

@injectable()
export class AutenticationUserCase {
  constructor (
    @inject("IAutenticationRepository") private repository: AutenticationRepository
  ) {}

  async login (payload: Authentication) {
    const dto = AuthenticationFactory.save(payload);
    return await this.repository.login(dto.email);
  }
}
