import type { Complement } from "../../Entities/Complement.domain.entities";

export interface IComplementRepository {
  create: (complement: Complement) => Promise<Complement|string>;
  views: () => Promise<Complement[]|string>;
  viewById: (id: string) => Promise<Complement|string>;
  update: (id: string, data: Complement) => Promise<Complement|string>;
  delete: (id: string) => Promise<string>;
}
