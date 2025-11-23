import { Elysia, t } from "elysia";
import { AutenticationController } from "../Controllers/AutenticationController.presentation.http.controller";
import { IJWTContext } from "../Types/IJWTContext.presentation.http.types";

const route = new Elysia();
const controller = new AutenticationController();

route
  .post("/login",
    async (ctx) => await controller.login(ctx as unknown as IJWTContext), 
    {
      tags: ["Authentication"],
      detail:{
        summary: "Login do usuário",
        description: "Autenticação com email e senha",
      },
      security: [{
        apiKey: ["x-api-key"]
      }],
      body: t.Object({
        email: t.String(),
        password: t.String()
      }),
      response: {
        200: t.Object({
          token: t.String(),
          mensagem: t.String()
        }),
        400: t.Object({
          codigo: t.String(),
          mensagem: t.String()
        }),
        401: t.Object({
          codigo: t.String(),
          mensagem: t.String()
        })
      }
    }
  );


export {
  route as RouteAutentication
}