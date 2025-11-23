import { injectable } from "tsyringe";
import CryptoJS from "crypto-js";
import { IJWTContext } from "../Types/IJWTContext.presentation.http.types";

@injectable()
export class AutenticationHashMiddleware {
  async validate ({ request, set, security }: IJWTContext) {
    const AUTHORIZATION = request.headers.get("Authorization");

    if (!AUTHORIZATION) {
      set.status = 401;
      return {
        mensagem: "Usuário não autorizado."
      }
    }

    const TOKEN = AUTHORIZATION.split(" ")[1];

    const DECRYPTED_TOKEN_CRYPTO = CryptoJS.AES.decrypt(
      TOKEN as string,
      process.env.APPLICATION_SECRET_KEY as string
    ).toString(CryptoJS.enc.Utf8);

    if (!DECRYPTED_TOKEN_CRYPTO) {
      set.status = 401;
      return {
        mensagem: "Token inválido"
      }
    }

    const VERIFY_JWT = await security.verify(DECRYPTED_TOKEN_CRYPTO);

    if (!VERIFY_JWT) {
      set.status = 401;
      return {
        mensagem: "Token inválido"
      }
    }
  }
}