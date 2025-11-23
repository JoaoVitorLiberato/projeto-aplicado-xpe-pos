import { User } from "../../Domain/Entities/User.domain.entities";
import { UserModel } from "../Database/Models/User.infrastructure.database.models";
import { IUserRepository } from "../../Domain/Ports/Repositories/IUserRepositoryPort.domain.ports.repostories";

export class UserRepository implements IUserRepository {
  async create (user: User): Promise<User|string> {
    return new Promise((resolve, reject) => {
      UserModel.create({ ...user })
        .then((responseModel) => resolve(responseModel as unknown as User))
        .catch((error) => {
          console.error("[ERROR UserRepository]", error)

          if (error.errors[0].message === "email must be unique") {
            resolve("email-already-exist-model")
          }

          reject(`error-create-user-models`)
        })
    })
  }

  async views (): Promise<User[]|string> {
    return new Promise((resolve, reject) => {
      UserModel.findAll({
        limit: 25,
        raw: true,
        attributes: {
          exclude: ["password"]
        }
      })
        .then((responseModel) => resolve(responseModel as unknown as User[]))
        .catch((error) => {
          console.error("[ERROR UserRepository]", error)
          reject("error-find-users-model")
        })
    })
  }

  async viewById (id: string): Promise<User|string> {
    return new Promise((resolve, reject) => {
      UserModel.findByPk(id, {
        raw: true,
        attributes: {
          exclude: ["id"]
        }
      })
        .then((responseModel) => resolve(responseModel as unknown as User))
        .catch((error) => {
          console.error("[ERROR UserRepository]", error)
          reject("error-find-user-by-id-model")
        })
    })
  }

  async update (id: string, user:User): Promise<string> {
    return new Promise((resolve, reject) => {
      UserModel.update({
        email: user.email,
        details: {
          name: user.details.name,
          age: user.details.age,
          phone: user.details.phone,
          thumbnail: {
            url: user.details.thumbnail?.url || "",
            upload: user.details.thumbnail?.upload || false
          }
        }
      }, { where: { id } })
        .then(() => resolve("update-user-success"))
        .catch((error) => {
          console.error("[ERROR UserRepository]", error);

          if (error.errors[0].message === "email must be unique") {
            resolve("email-already-exist-model")
          }

          reject(`error-update-user-models`);
        })
    })
  }

  async delete (id: string): Promise<string> {
    return new Promise((resolve, reject) => {
      UserModel.destroy({ where: { id } })
        .then(() => resolve("delete-user-success"))
        .catch((error) => {
          console.error("[ERROR UserRepository]", error)
          reject(`error-delete-user-models`)
        })
    })
  }
}