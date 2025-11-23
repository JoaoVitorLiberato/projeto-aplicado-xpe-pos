import { Elysia, t } from "elysia";
import { IJWTContext } from "../Types/IJWTContext.presentation.http.types";
import { ItemsCartController } from "../Controllers/ItemsCartController.presentation.http.controller";

const router = new Elysia();
const controller = new ItemsCartController();

router
  .get("/items",
    (ctx) => controller.views(ctx as unknown as IJWTContext),
      {
    tags: ["Items"],
    detail: {
      summary: "Ver todos itens",
      description: "Ver todos itens de todos os pedidos já realizados em nosso site",
    },
    response: {
      200: t.Array(
        t.Object({
          id: t.String(),
          name: t.String(),
          price: t.Object({
            default: t.Number(),
            discount: t.Object({
              percentage: t.Number(),
              status: t.Boolean()
            })
          }),
          quantity: t.Number(),
          total: t.Number(),
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
          complements: t.Optional(
            t.Array(
              t.Object({
                id: t.String(),
                name: t.String(),
                price: t.Number(),
                quantity: t.Number()
              })
            )
          ),
          order: t.Object({
            id: t.String(),
            nome: t.String(),
          })
        })
      ),
      400: t.Object({
        codigo: t.String(),
        mensagem: t.String(),
      }),
      404: t.Object({
        codigo: t.String(),
        mensagem: t.String(),
      }),
    }
  }
)
router
  .get("/item/:id",
    (ctx) => controller.viewById(ctx as unknown as IJWTContext),
    {
      tags: ["Items"],
      detail: {
        summary: "Procurar item pelo ID",
        description: "Procurar um item específico de um pedido pelo ID",
      },
      params: t.Object({
        id: t.String({ title: "ID dos itens cadastrados no banco de dados." })
      }),
      response: {
        200: t.Object({
          name: t.String(),
          price: t.Object({
            default: t.Number(),
            discount: t.Object({
              percentage: t.Number(),
              status: t.Boolean()
            })
          }),
          quantity: t.Number(),
          total: t.Number(),
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
          complements: t.Optional(
            t.Array(
              t.Object({
                id: t.String(),
                name: t.String(),
                price: t.Number(),
                quantity: t.Number()
              })
            )
          ),
          order: t.Object({
            id: t.String(),
            nome: t.String(),
          })
        }),
        400: t.Object({
          codigo: t.String(),
          mensagem: t.String(),
        }),
        404: t.Object({
          codigo: t.String(),
          mensagem: t.String(),
        }),
      }
    }
)

router
  .post("/item/save",
    (ctx) => controller.create(ctx as unknown as IJWTContext),
      {
    tags: ["Items"],
    detail: {
      summary: "Salvar item no cart",
      description: "Salva um item no carrinho do pedido",
    },
    body: t.Object({
      name: t.String(),
      price: t.Object({
        default: t.Number(),
        discount: t.Object({
          percentage: t.Number(),
          status: t.Boolean()
        })
      }),
      quantity: t.Number(),
      total: t.Number(),
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
      orderId: t.String(),
      complements: t.Optional(
        t.Array(
          t.Object({
            id: t.String(),
            name: t.String(),
            price: t.Number(),
            quantity: t.Number()
          })
        )
      ),
    }),
    response: {
      200: t.Object({
        mensagem: t.String(),
      }),
      400: t.Object({
        codigo: t.String(),
        mensagem: t.String(),
      }),
      404: t.Object({
        codigo: t.String(),
        mensagem: t.String(),
      }),
    }
  }
)

router
  .put("/item/update/:id",
    (ctx) => controller.update(ctx as unknown as IJWTContext),
      {
    tags: ["Items"],
    detail: {
      summary: "Atualiza o item pelo ID",
      description: "Atualiza o item do pedido pelo ID no banco de dados",
    },
    params: t.Object({
      id: t.String({ title: "ID dos itens cadastrados no banco de dados." })
    }),
    body: t.Object({
      name: t.String(),
      price: t.Object({
        default: t.Number(),
        discount: t.Object({
          percentage: t.Number(),
          status: t.Boolean()
        })
      }),
      quantity: t.Number(),
      total: t.Number(),
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
      orderId: t.String(),
      complements: t.Optional(
        t.Array(
          t.Object({
            id: t.String(),
            name: t.String(),
            price: t.Number(),
            quantity: t.Number()
          })
        )
      ),
    }),
    response: {
      200: t.Object({
        mensagem: t.String(),
      }),
      400: t.Object({
        codigo: t.String(),
        mensagem: t.String(),
      }),
      404: t.Object({
        codigo: t.String(),
        mensagem: t.String(),
      }),
    }
  }
)

router
  .delete("/item/delete/:id",
    (ctx) => controller.delete(ctx as unknown as IJWTContext),
      {
    tags: ["Items"],
    detail: {
      summary: "Atualiza o item pelo ID",
      description: "Atualiza o item do pedido pelo ID no banco de dados",
    },
    params: t.Object({
      id: t.String({ title: "ID dos itens cadastrados no banco de dados." })
    }),
    response: {
      200: t.Object({
        mensagem: t.String(),
      }),
      400: t.Object({
        codigo: t.String(),
        mensagem: t.String(),
      }),
      404: t.Object({
        codigo: t.String(),
        mensagem: t.String(),
      }),
    }
  }
)

export {
  router as RouterItemsCart
}
