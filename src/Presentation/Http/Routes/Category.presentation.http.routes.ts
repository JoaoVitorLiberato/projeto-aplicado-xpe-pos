import { Context, Elysia, t } from "elysia";
import { CategoryController } from "../Controllers/CategoryController.presentation.http.controller";
import { AutenticationHashMiddleware } from "../Middlewares/AutenticationHashRoutes.presentation.http.middlewares";
import { IJWTContext } from "../Types/IJWTContext.presentation.http.types";

const router = new Elysia()

const controller = new CategoryController();
const middleware = new AutenticationHashMiddleware();

router
  .get("/categories",
    (ctx) => controller.views(ctx as unknown as IJWTContext),
    {
      tags: ["Category"],
      detail: {
        summary: "Listar todas as categorias",
        description: "Retorna todas as categorias cadastradas no banco de dados"
      },
      security: [{ apiKey: ["x-api-key"] }],
      response: {
        200: t.Array(t.Object({
          id: t.String(),
          icon: t.String(),
          name: t.String(),
        })),
        400: t.Object({
          codigo: t.String(),
          mensagem: t.String()
        }),
        404: t.Object({
          codigo: t.String(),
          mensagem: t.String()
        })
      }
    }
  );

router
  .onBeforeHandle((ctx) => middleware.validate(ctx as unknown as IJWTContext))
  .get("/category/:id",
    (ctx) => controller.viewById(ctx as unknown as IJWTContext),
    {
      tags: ["Category"],
      detail: {
        summary: "Listar uma categoria pelo ID",
        description: "Retorna uma categoria cadastrada no banco de dados pelo ID",
        params: {
          id: "ID da categoria"
        }
      },
      security: [{ 
        apiKey: ["x-api-key"],
        bearer: ["Authorization"]
      }],
      response: {
        200: t.Object({
          id: t.String(),
          icon: t.String(),
          name: t.String(),
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
  .post("/category/create",
    (ctx) => controller.create(ctx as Context),
    {
      tags: ["Category"],
      detail: {
        summary: "Criar uma categoria",
        description: "Cria uma categoria no banco de dados"
      },
      security: [{ 
        apiKey: ["x-api-key"],
        bearer: ["Authorization"]
      }],
      body: t.Object({
        icon: t.String(),
        name: t.String(),
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
  .put("/category/update/:id",
    (ctx) => controller.update(ctx as unknown as IJWTContext),
    {
      tags: ["Category"],
      detail: {
        summary: "Atualizar uma categoria pelo ID",
        description: "Atualiza uma categoria no banco de dados pelo ID",
        params: {
          id: "ID da categoria"
        }
      },
      security: [{ 
        apiKey: ["x-api-key"],
        bearer: ["Authorization"]
      }],
      body: t.Object({
        icon: t.String(),
        name: t.String(),
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
  .delete("/category/delete/:id",
    (ctx) => controller.delete(ctx as unknown as IJWTContext),
    {
      tags: ["Category"],
      detail: {
        summary: "Deletar uma categoria pelo ID",
        description: "Deleta uma categoria no banco de dados pelo ID",
        params: {
          id: "ID da categoria"
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

export { router as RouteCategory };
