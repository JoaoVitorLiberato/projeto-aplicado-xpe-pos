import { Context } from "elysia";

export function AutenticationApp ({ request, set }: Context) {
  const APPLICATION_KEY = request.headers.get("x-api-key");
  if (/\/swagger/i.test(String(request.url))) return;

  if (String(APPLICATION_KEY) !== String(process.env.APPLICATION_KEY)) {
    set.status = 401;
    return {
      mensagem: "Usuário não autorizado."
    }
  }
}