import type { User } from "../../Entities/User.domain.entities";

export interface IUserRepository {
  async views(): Promise<User[]|string>;
  async viewById(id:string): Promise<User|string>;
  async create(user: User): Promise<User|string>;
  async update(id: string, user: User): Promise<User|string>;
  async delete(id: string): Promise<string>;
}