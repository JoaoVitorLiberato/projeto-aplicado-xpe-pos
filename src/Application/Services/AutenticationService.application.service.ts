import { injectable } from "tsyringe";
import argon2 from "argon2";
import CryptoJS from "crypto-js";
import { AutenticationUserCase } from "../Usecases/AutenticationUseCase.application.usecases";
import { InternalNotificationServiceAdapter } from "../../Infrastructure/Adapters/Internal/Notifications/InternalNotificationAdapter.infrastructure.adapters";
import { User } from "../../Domain/Entities/User.domain.entities";
import { IJWTContext } from "../../Presentation/Http/Types/IJWTContext.presentation.http.types";


@injectable()
export class AutenticationService {
  constructor (
    private autentication: AutenticationUserCase,
    private notify: InternalNotificationServiceAdapter
  ) {}

  async login (
    email: string,
    password: string,
    context: IJWTContext
  ): Promise<any> {
    try {
      const responseRepository = await this.autentication.login({
        email,
        password
      });

      const USER = responseRepository as User;
      const VALIDATE_PASSWORD = await argon2.verify(USER.password, password);

      if (!VALIDATE_PASSWORD) {
        return await this.notify.send({
          codigo: "error-autentication-user",
          mensagem: "Email ou senha inválida"
        });
      }

      const {
        security
      } = context;

      const TOKEN = await security.sign(
        {
          id: USER.id,
          exp: Math.floor(Date.now() / 1000) + (8 * 60 * 60)
        },
        String(process.env.APPLICATION_SECRET_KEY)
      );

      const HASH = CryptoJS.AES.encrypt(
        String(TOKEN),
        process.env.APPLICATION_SECRET_KEY as string
      ).toString();

      return await this.notify.send({
        mensagem: "Login realizado com sucesso",
        token: HASH
      });
    } catch (error) {
      console.error("[ERROR AutenticationService]", error);
      return await this.notify.send({
        codigo: "error-login-user",
        mensagem: "Houve um erro ao tentar fazer login"
      });
    }
  }
}
