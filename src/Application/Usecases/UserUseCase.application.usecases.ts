import { inject, injectable } from "tsyringe";
import argon2 from "argon2"
import { User } from "../../Domain/Entities/User.domain.entities";
import { IUserRepository } from "../../Domain/Ports/Repositories/IUserRepositoryPort.domain.ports.repostories";
import { UserFactory } from "../../Domain/Factory/UserFactory.domain.factory";

interface UserRepository extends IUserRepository {}

@injectable({})
export class UserUseCase {
  constructor (
    @inject("IUserRepository")
      private readonly repository: UserRepository
  ) {}

  async views () {
    return await this.repository.views();
  }

  async viewById (id: string) {
    return await this.repository.viewById(id)
  }

  async create (user: User) {
    const factory = UserFactory.save(user);

    const HASH = await argon2.hash(factory.password);

    const dto = {
      ...factory,
      password: HASH
    }

    return await this.repository.create(dto);
  }

  async update (id: string, user: User) {
    const USER_FOUNDED = await this.repository.viewById(id) as User;

    const VALIDATE_PSW = await argon2.verify(USER_FOUNDED.password, user.password);

    let hash;
    if (!VALIDATE_PSW) {
      hash = await argon2.hash(user.password)
    }

    const factory = UserFactory.save(user);
    const dto = {
      ...factory,
      password: hash as string
    }

    return await this.repository.update(id, dto);
  }

  async delete (id: string) {
    return await this.repository.delete(id)
  }
}