import { Context, Elysia, t } from "elysia";
import { ComplementController } from "../Controllers/ComplementController.presentation.http.controller";
import { IJWTContext } from "../Types/IJWTContext.presentation.http.types";
import { AutenticationHashMiddleware } from "../Middlewares/AutenticationHashRoutes.presentation.http.middlewares";

const router = new Elysia()

const controller = new ComplementController();
const middleware = new AutenticationHashMiddleware();

router
  .get("/complements",
    (ctx) => controller.views(ctx as unknown as IJWTContext),
    {
      tags: ["Complement"],
      detail: {
        summary: "Listar todos os complementos",
        description: "Retorna todos os complementos cadastrados no banco de dados"
      },
      security: [{ apiKey: ["x-api-key"] }],
      response: {
        200: t.Array(t.Object({
          id: t.String(),
          name: t.String(),
          description: t.String(),
          price: t.Union([t.Number(), t.String()])
        })),
        400: t.Object({
          codigo: t.String(),
          mensagem: t.String()
        })
      }
    }
  );

router
  .onBeforeHandle((ctx) => middleware.validate(ctx as IJWTContext))
  .get("/complement/:id",
    (ctx) => controller.viewById(ctx as unknown as IJWTContext),
    {
      tags: ["Complement"],
      detail: {
        summary: "Listar um complemento pelo ID",
        description: "Retorna um complemento cadastrado no banco de dados pelo ID",
        params: {
          id: "ID do complemento"
        }
      },
      security: [{ 
        apiKey: ["x-api-key"],
        bearer: ["Authorization"]
      }],
      response: {
        200: t.Object({
          id: t.String(),
          name: t.String(),
          description: t.String(),
          price: t.Union([t.Number(), t.String()])
        }),
        400: t.Object({
          codigo: t.String(),
          mensagem: t.String()
        }),
        404: t.Object({
          codigo: t.String(),
          mensagem: t.String()
        }),
      }
    }
  );

router
  .onBeforeHandle((ctx) => middleware.validate(ctx as unknown as IJWTContext))
  .post("/complement/create",
    (ctx) => controller.create(ctx as unknown as IJWTContext),
    {
      tags: ["Complement"],
      detail: {
        summary: "Criar um complemento",
        description: "Cria um complemento no banco de dados"
      },
      security: [{ 
        apiKey: ["x-api-key"],
        bearer: ["Authorization"]
      }],
      body: t.Object({
        name: t.String(),
        description: t.String(),
        price: t.Union([t.Number(), t.String()])
      }),
      response: {
        200: t.Object({
          mensagem: t.String()
        }),
        400: t.Object({
          codigo: t.String(),
          mensagem: t.String()
        })
      }
    }
  );

router
  .onBeforeHandle((ctx) => middleware.validate(ctx as unknown as IJWTContext))
  .put("/complement/update/:id",
    (ctx) => controller.update(ctx as unknown as IJWTContext),
    {
      tags: ["Complement"],
      detail: {
        summary: "Atualizar um complemento pelo ID",
        description: "Atualiza um complemento no banco de dados pelo ID",
        params: {
          id: "ID do complemento"
        }
      },
      security: [{ 
        apiKey: ["x-api-key"],
        bearer: ["Authorization"]
      }],
      body: t.Object({
        name: t.String(),
        description: t.String(),
        price: t.Union([t.Number(), t.String()])
      }),
      response: {
        200: t.Object({
          mensagem: t.String()
        }),
        400: t.Object({
          codigo: t.String(),
          mensagem: t.String()
        })
      }
    }
  );

router
  .onBeforeHandle((ctx) => middleware.validate(ctx as unknown as IJWTContext))
  .delete("/complement/delete/:id",
    (ctx) => controller.delete(ctx as unknown as IJWTContext),
    {
      tags: ["Complement"],
      detail: {
        summary: "Deletar um complemento pelo ID",
        description: "Deleta um complemento no banco de dados pelo ID",
        params: {
          id: "ID do complemento"
        }
      },
      security: [{ 
        apiKey: ["x-api-key"],
        bearer: ["Authorization"]
      }],
      response: {
        200: t.Object({
          mensagem: t.String()
        }),
        400: t.Object({
          codigo: t.String(),
          mensagem: t.String()
        })
      }
    }
  );

export { router as RouteComplement };
