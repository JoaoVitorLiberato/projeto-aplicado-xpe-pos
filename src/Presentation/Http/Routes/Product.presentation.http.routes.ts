import { Elysia, t } from "elysia";
import { IJWTContext } from "../Types/IJWTContext.presentation.http.types";
import { ProductController } from "../Controllers/ProductController.presentation.http.controller";
import { AutenticationHashMiddleware } from "../Middlewares/AutenticationHashRoutes.presentation.http.middlewares";

const router = new Elysia()

const controller = new ProductController()
const middleware = new AutenticationHashMiddleware()

router.get("/products",  (ctx) => controller.views(ctx as unknown as IJWTContext),
  {
    tags: ["Product"],
    detail: {
      summary: "Listar todos os produtos",
      description: "Retorna todos os produtos cadastrados no banco de dados"
    },
    security: [{
      apiKey: ["x-api-key"]
    }],
    response: {
      200: t.Array(t.Object({
        id: t.String(),
        name: t.String(),
        description: t.String(),
        price: t.Object({
          default: t.Number(),
          discount: t.Object({
            status: t.Boolean(),
            percentage: t.Number()
          })
        }),
        tumbnail: t.Object({
          url: t.String(),
        }),
        differences: t.Optional(
          t.Record(
            t.String(),
            t.Object({
              readonly: t.Boolean(),
              status: t.Boolean(),
              value: t.Number()
            })
          )
        ),
        note_client: t.Number(),
        category: t.Object({
          id: t.String(),
          name: t.String(),
          icon: t.String()
        })
      })),
      400: t.Object({
        codigo: t.String(),
        mensagem: t.String()
      }),
      404: t.Object({
        codigo: t.String(),
        mensagem: t.String()
      })
    },
  }
)

router
  .onBeforeHandle((ctx) => middleware.validate(ctx as IJWTContext))
  .get("/product/:id", (ctx) => controller.viewById(ctx as unknown as IJWTContext),
    {
      tags: ["Product"],
      detail: {
        summary: "Listar um produto pelo ID",
        description: "Retorna um produto cadastrado no banco de dados pelo ID",
        params: {
          id: "ID do produto"
        }
      },
      security: [{
        apiKey: ["x-api-key"],
        authorization: ["Authorization"]
      }],
      response: {
        200: t.Object({
          id: t.String(),
          name: t.String(),
          description: t.String(),
          price: t.Object({
            default: t.Number(),
            discount: t.Object({
              status: t.Boolean(),
              percentage: t.Number()
            })
          }),
          tumbnail: t.Object({
            url: t.String(),
          }),
          differences: t.Optional(
            t.Record(
              t.String(),
              t.Object({
                readonly: t.Boolean(),
                status: t.Boolean(),
                value: t.Number()
              })
            )
          ),
          note_client: t.Number(),
          category: t.Object({
            id: t.String(),
            name: t.String(),
            icon: t.String()
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
      },
    }
  )

router
  .onBeforeHandle((ctx) => middleware.validate(ctx as IJWTContext))
  .post("/product/create", (ctx) => controller.create(ctx as unknown as IJWTContext),
  {
    type: "multipart",
    body: t.Form({
      product: t.String(t.Object({
        id: t.String(),
        name: t.String(),
        description: t.String(),
        price: t.Object({
          default: t.Number(),
          discount: t.Object({
            status: t.Boolean(),
            percentage: t.Number()
          })
        }),
        tumbnail: t.Object({
          location: t.String(),
          url: t.String(),
        }),
        differences: t.Optional(
          t.Record(
            t.String(),
            t.Object({
              readonly: t.Boolean(),
              status: t.Boolean(),
              value: t.Number()
            })
          )
        ),
        note_client: t.Number(),
        category: t.Object({
          id: t.String(),
          name: t.String(),
          icon: t.String()
        })
      })),
      image: t.Optional(t.File({
        maxSize: 1024 * 1024 * 5,
      }))
    }),
    tags: ["Product"],
    detail: {
      summary: "Criar um novo produto",
      description: "Cria um novo produto no banco de dados",
    },
    security: [{
      apiKey: ["x-api-key"],
      authorization: ["Authorization"]
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
)

router
  .onBeforeHandle((ctx) => middleware.validate(ctx as IJWTContext))
  .put("/product/update/:id", (ctx) => controller.update(ctx as unknown as IJWTContext),
    {
      tags: ["Product"],
      detail: {
        summary: "Atualizar produto pelo ID",
        description: "Atualiza um produto no banco de dados pelo ID",
        params: {
          id: "ID do produto"
        }
      },
      security: [{
        apiKey: ["x-api-key"],
        authorization: ["Authorization"]
      }],
      type: "multipart",
      body: t.Form({
        product: t.String(t.Object({
          id: t.String(),
          name: t.String(),
          description: t.String(),
          price: t.Object({
            default: t.Number(),
            discount: t.Object({
              status: t.Boolean(),
              percentage: t.Number()
            })
          }),
          tumbnail: t.Object({
            location: t.String(),
            url: t.String(),
          }),
          differences: t.Optional(
            t.Record(
              t.String(),
              t.Object({
                readonly: t.Boolean(),
                status: t.Boolean(),
                value: t.Number()
              })
            )
          ),
          note_client: t.Number(),
          category: t.Object({
            id: t.String(),
            name: t.String()
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
  )

router
  .onBeforeHandle((ctx) => middleware.validate(ctx as IJWTContext))
  .delete("/product/delete/:id", (ctx) => controller.delete(ctx as unknown as IJWTContext),
    {
      tags: ["Product"],
      detail: {
        summary: "Deletar produto pelo ID",
        description: "Deleta um produto no banco de dados pelo ID",
        params: {
          id: "ID do produto"
        }
      },
      security: [{
        apiKey: ["x-api-key"],
        authorization: ["Authorization"]
      }],
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
  )

export {
  router as RouteProduct
}
