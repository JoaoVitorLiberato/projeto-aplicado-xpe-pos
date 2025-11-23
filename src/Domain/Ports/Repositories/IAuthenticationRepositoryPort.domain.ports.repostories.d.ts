import type { User } from "../../Entities/User.domain.entities";

export interface IAutenticationRepository {
  login: (email: string) => Promise<User|string>
}
