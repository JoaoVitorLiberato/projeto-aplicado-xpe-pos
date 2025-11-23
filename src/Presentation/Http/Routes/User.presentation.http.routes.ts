import { Elysia, t } from "elysia";
import { IJWTContext } from "../Types/IJWTContext.presentation.http.types";
import { UserController } from "../Controllers/UserController.presentation.http.controller";
import { AutenticationHashMiddleware } from "../Middlewares/AutenticationHashRoutes.presentation.http.middlewares";

const router = new Elysia();
const controller = new UserController()
const middleware = new AutenticationHashMiddleware()

router
  .onBeforeHandle((ctx) => middleware.validate(ctx as IJWTContext))
  .get("/users",
    (ctx) => controller.views(ctx as unknown as IJWTContext),
    {
      tags: ["User"],
      detail: {
        summary: "Buscar todos usuários",
        description: "Buscar todos os usuários cadastrados no sistema",
      },
      security: [{
        apiKey: ["x-api-key"],
        authorization: ["Authorization"]
      }],
      response: {
        200: t.Array(t.Object({
          id: t.String(),
          email: t.String(),
          details: t.Object({
            name: t.String(),
            age: t.Number(),
            phone: t.String(),
            thumbnail: t.Object({
              url: t.String()
            })
          })
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
  .get("/user/:id",
    (ctx) => controller.viewById(ctx as unknown as IJWTContext),
    {
      tags: ["User"],
      detail: {
        summary: "Buscar usuário pelo ID",
        description: "Buscar o usuário específico pelo ID",
      },
      security: [{
        apiKey: ["x-api-key"],
        authorization: ["Authorization"]
      }],
      params: t.Object({
        id: t.String()
      }),
      response: {
        200: t.Object({
          email: t.String(),
          details: t.Object({
            name: t.String(),
            age: t.Number(),
            phone: t.String(),
            thumbnail: t.Object({
              url: t.String()
            })
          })
        }),
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
  .onBeforeHandle((ctx) => middleware.validate(ctx as IJWTContext))
  .post("/user/create",
    (ctx) => controller.create(ctx as unknown as IJWTContext),
    {
      tags: ["User"],
      detail: {
        summary: "Criar novo usuário",
        description: "Cria um novo usuário para o sistema",
      },
      security: [{
        apiKey: ["x-api-key"],
        authorization: ["Authorization"]
      }],
      type: "multipart",
      body: t.Form({
        user: t.String(t.Object({
          email: t.String(),
          password: t.String({ minLength: 8 }),
          details: t.Object({
            name: t.String(),
            age: t.Number(),
            phone: t.String({ minLength: 11 }),
            thumbnail: t.Optional(t.Object({
              url: t.String(),
              upload: t.Boolean()
            }))
          })
        })),
        image: t.Optional(t.File({
          maxSize: 1024 * 1024 * 5,
        }))
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
  .onBeforeHandle((ctx) => middleware.validate(ctx as IJWTContext))
  .put("/user/update/:id",
    (ctx) => controller.update(ctx as unknown as IJWTContext),
    {
      tags: ["User"],
      detail: {
        summary: "Atualizar usuário",
        description: "Atualizar o usuário pelo ID",
      },
      security: [{
        apiKey: ["x-api-key"],
        authorization: ["Authorization"]
      }],
      params: t.Object({
        id: t.String()
      }),
      type: "multipart",
      body: t.Form({
        user: t.String(t.Object({
          email: t.String(),
          password: t.String({ minLength: 8 }),
          details: t.Object({
            name: t.String(),
            age: t.Number(),
            phone: t.String({ minLength: 11 }),
            thumbnail: t.Optional(t.Object({
              url: t.String(),
              upload: t.Boolean()
            }))
          })
        })),
        image: t.Optional(t.File({
          maxSize: 1024 * 1024 * 5,
        }))
      }),
      response: {
        200: t.Object({
          mensagem: t.String()
        }),
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
  .onBeforeHandle((ctx) => middleware.validate(ctx as IJWTContext))
  .delete("/user/delete/:id",
    (ctx) => controller.delete(ctx as unknown as IJWTContext),
    {
      tags: ["User"],
      detail: {
        summary: "Deletar usuário",
        description: "Deletar o usuário pelo ID",
      },
      security: [{
        apiKey: ["x-api-key"],
        authorization: ["Authorization"]
      }],
      params: t.Object({
        id: t.String()
      }),
      response: {
        200: t.Object({
          mensagem: t.String()
        }),
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

export { router as RouterUser }
