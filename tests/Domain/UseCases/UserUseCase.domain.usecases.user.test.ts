import "reflect-metadata"
import { test, expect, describe } from "bun:test";
import { UserUseCase } from "../../../src/Application/Usecases/UserUseCase.application.usecases";
import { UserRepository } from "../../../src/Infrastructure/Repositories/User.infrastructure.repositories";
import { User } from "../../../src/Domain/Entities/User.domain.entities";

describe("UserUseCase", () => {
  test("Testando um novo usuário sendo criado", async () => {
    const repository = new UserRepository()
    const userUseCase = new UserUseCase(repository)
    const responseRepository = await userUseCase.create({
      email: "teste@teste.com",
      password: "12345678",
      details: {
        name: "Teste",
        age: 18,
        phone: "21967559557",
        thumbnail: {
          upload: true,
          url: "public/test"
        }
      }
    } as User)

    if (typeof responseRepository === 'string') {
      throw new Error('Falha ao criar usuário');
    }
    
    const user = responseRepository as User

    expect(user.email).toBe("teste@teste.com");
    expect(user.password).toBe("12345678");
    expect(user.details.name).toBe("Teste");
    expect(user.details.age).toBe(18);
    expect(user.details.phone).toBe("21967559557");
    expect(user.details.thumbnail?.upload).toBe(true);
    expect(user.details.thumbnail?.url).toBe("public/test");
  });
});