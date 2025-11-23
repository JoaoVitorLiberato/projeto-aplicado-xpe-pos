import { Elysia, t } from "elysia";
import { OrderController } from "../Controllers/OrderController.presentation.http.controller";
import { AutenticationHashMiddleware } from "../Middlewares/AutenticationHashRoutes.presentation.http.middlewares";
import { IJWTContext } from "../Types/IJWTContext.presentation.http.types";

const router = new Elysia();
const clients: Set<WebSocket> = new Set();

const controller = new OrderController();
const middleware = new AutenticationHashMiddleware();

router.get("/order/today/:phone",
  (ctx) => controller.viewByPhone(ctx as unknown as IJWTContext),
  {
    tags: ["Order"],
    detail: {
      summary: "Visualiza pedido pelo telefone",
      description: "Visualiza um pedido pelo telefone",
      params: {
        phone: "Telefone do cliente"
      }
    },
    response: {
      200: t.Array(t.Object({
        id: t.String(),
        nome: t.String(),
        telefone: t.String(),
        mensagem: t.String(),
        segmento: t.String(),
        status: t.String(),
        pagamento: t.Object({
          formaPagamento: t.String(),
          statusPagamento: t.String(),
          valorFrete: t.Number(),
          valorProdutos: t.Number(),
          valorTotal: t.Number(),
          recebido: t.Optional(
            t.Object({
              receipt_url: t.String(),
            })
          )
        }),
        itemsCarts: t.Array(
          t.Object({
            id: t.String(),
            name: t.String(),
            price: t.Object({
              default: t.Number()
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
            complements: t.Optional(t.Array(t.Object({
              id: t.String(),
              name: t.String(),
              price: t.Number(),
              quantity: t.Number(),
            }))),
          })
        )
      })),
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
);

router
  .post("/order/init",
    (ctx) => controller.init(ctx as unknown as IJWTContext),
    {
      tags: ["Order"],
      detail: {
        summary: "Inicia o pedido gerando",
        description: "Inicia o pedido gerando um novo ID para escolher os itens.",
      },
      response: {
        200: t.Object({
          mensagem: t.String(),
          data: t.Object({
            id: t.String(),
          })
        }),
        400: t.Object({
          codigo: t.String(),
          mensagem: t.String(),
        }),
      }
    }
  )

router
  .ws("/orders", {
    open(ws) {
      const {
        data: { 
          query: {
            token: HASH
          }
        }
      } = ws;

      if (!HASH) {
        ws.send(`🧩 Você não está autorizado a se conectar com o canal de pedidos.`);
        ws.close();
        return;
      }

      clients.add(ws as any);
      ws.send(`🧩 Conectado ao canal de pedidos.`);
    },
    message(ws) {
      ws.send("🧩 Pedido Recebido com sucesso");
    },
    close(ws) {
      clients.delete(ws as any);
    },
  })
  .patch(
    "/order/finish", (ctx) => controller.create(ctx as IJWTContext),
    {
      tags: ["Order"],
      detail: {
        summary: "Atualiza o pedido que foi criado ao entrar no segmento",
        description: "Atualiza o pedido que foi criado ao entrar no segmento com os dados do cliente, produtos e etc.",
      },
      body: t.Object({
        id: t.String(),
        canal: t.String(),
        nome: t.String(),
        segmento: t.String(),
        status: t.String(),
        telefone: t.String(),
        mensagem: t.String({ maxLength: 255 }),
        pagamento: t.Object({
          formaPagamento: t.String(),
          statusPagamento: t.String(),
          valorFrete: t.Number(),
          valorProdutos: t.Number(),
          valorTotal: t.Number(),
          desconto: t.Number(),
        }),
        endereco: t.Object({
          cep: t.String(),
          logradouro: t.String(),
          bairro: t.String(),
          cidade: t.String(),
          uf: t.String(),
          numero: t.String(),
          complemento: t.String(),
          referencia: t.String(),
        }),
        analytics: t.Object({
          source: t.String(),
          medium: t.String(),
          campaign: t.String(),
          params: t.Record(t.String(), t.Union([t.String(), t.Number(), t.Boolean()]))
        })
      }),
      response: {
        200: t.Object({
          mensagem: t.String(),
          data: t.Object({
            id: t.String(),
          })
        }),
        400: t.Object({
          codigo: t.String(),
          mensagem: t.String(),
        }),
      }
    }
  );

// TODO: Verificar se é necessário o token de autenticação
router
  .onBeforeHandle((ctx) => middleware.validate(ctx as unknown as IJWTContext))
  .get(
    "/orders/all", (ctx) => controller.views(ctx as unknown as IJWTContext),
    {
      tags: ["Order"],
      detail: {
        summary: "Visualizar todos os pedidos",
        description: "Visualiza todos os pedidos já criados",
      },
      response: {
        200: t.Array(t.Object({
          id: t.String(),
          canal: t.String(),
          nome: t.String(),
          segmento: t.String(),
          status: t.String(),
          telefone: t.String(),
          mensagem: t.String({ maxLength: 255 }),
          endereco: t.Object({
            cep: t.String(),
            logradouro: t.String(),
            bairro: t.String(),
            cidade: t.String(),
            uf: t.String(),
            numero: t.String(),
            complemento: t.String(),
            referencia: t.String(),
          }),
          analytics: t.Object({
            source: t.String(),
            medium: t.String(),
            campaign: t.String(),
            params: t.Record(t.String(), t.Union([t.String(), t.Number(), t.Boolean()]))
          }),
          pagamento: t.Object({
            formaPagamento: t.String(),
            statusPagamento: t.String(),
            valorFrete: t.Number(),
            valorProdutos: t.Number(),
            valorTotal: t.Number(),
            recebido: t.Optional(
              t.Object({
                receipt_url: t.String(),
              })
            )
          }),
          itemsCarts: t.Array(
            t.Object({
              id: t.String(),
              name: t.String(),
              price: t.Object({
                default: t.Number()
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
              complements: t.Optional(t.Array(t.Object({
                id: t.String(),
                name: t.String(),
                price: t.Number(),
                quantity: t.Number(),
              }))),
            })
          )
        })),
        400: t.Object({
          codigo: t.String(),
          mensagem: t.String(),
        })
      }
    }
  )

router
  .onBeforeHandle((ctx) => middleware.validate(ctx as unknown as IJWTContext))
  .get(
    "/order/:id", (ctx) => controller.viewById(ctx as unknown as IJWTContext),
    {
      tags: ["Order"],
      detail: {
        summary: "Visualiza pedido pelo ID",
        description: "Visualiza um pedido pelo ID",
        params: {
          id: "ID do pedido"
        }
      },
      response: {
        200: t.Object({
          id: t.String(),
          canal: t.String(),
          nome: t.String(),
          segmento: t.String(),
          status: t.String(),
          telefone: t.String(),
          mensagem: t.String({ maxLength: 255 }),
          endereco: t.Object({
            cep: t.String(),
            logradouro: t.String(),
            bairro: t.String(),
            cidade: t.String(),
            uf: t.String(),
            numero: t.String(),
            complemento: t.String(),
            referencia: t.String(),
          }),
          analytics: t.Object({
            source: t.String(),
            medium: t.String(),
            campaign: t.String(),
            params: t.Record(t.String(), t.Union([t.String(), t.Number(), t.Boolean()]))
          }),
          pagamento: t.Object({
            formaPagamento: t.String(),
            statusPagamento: t.String(),
            valorFrete: t.Number(),
            valorProdutos: t.Number(),
            valorTotal: t.Number(),
            recebido: t.Optional(
              t.Object({
                receipt_url: t.String(),
              })
            )
          }),
          itemsCarts: t.Array(
            t.Object({
              id: t.String(),
              name: t.String(),
              price: t.Object({
                default: t.Number()
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
              complements: t.Optional(t.Array(t.Object({
                id: t.String(),
                name: t.String(),
                price: t.Number(),
                quantity: t.Number(),
              }))),
            })
          )
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
  .onBeforeHandle((ctx) => middleware.validate(ctx as unknown as IJWTContext))
  .get(
    "/orders/today", (ctx) => controller.viewToday(ctx as unknown as IJWTContext),
    {
      tags: ["Order"],
      detail: {
        summary: "Visualizar pedidos do dia",
        description: "Visualiza todos os pedidos do dia"
      },
      response: {
        200: t.Array(t.Object({
          id: t.String(),
          canal: t.String(),
          nome: t.String(),
          segmento: t.String(),
          status: t.String(),
          telefone: t.String(),
          mensagem: t.String({ maxLength: 255 }),
          endereco: t.Object({
            cep: t.String(),
            logradouro: t.String(),
            bairro: t.String(),
            cidade: t.String(),
            uf: t.String(),
            numero: t.String(),
            complemento: t.String(),
            referencia: t.String(),
          }),
          analytics: t.Object({
            source: t.String(),
            medium: t.String(),
            campaign: t.String(),
            params: t.Record(t.String(), t.Union([t.String(), t.Number(), t.Boolean()]))
          }),
          pagamento: t.Object({
            formaPagamento: t.String(),
            statusPagamento: t.String(),
            valorFrete: t.Number(),
            valorProdutos: t.Number(),
            valorTotal: t.Number(),
            recebido: t.Optional(
              t.Object({
                receipt_url: t.String(),
              })
            )
          }),
          itemsCarts: t.Array(
            t.Object({
              id: t.String(),
              name: t.String(),
              price: t.Object({
                default: t.Number()
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
              complements: t.Optional(t.Array(t.Object({
                id: t.String(),
                name: t.String(),
                price: t.Number(),
                quantity: t.Number(),
              }))),
            })
          )
        })),
        400: t.Object({
          codigo: t.String(),
          mensagem: t.String(),
        })
      }
    }
  )

router
  .onBeforeHandle((ctx) => middleware.validate(ctx as unknown as IJWTContext))
  .patch(
    "/order/update/:id", (ctx) => controller.updateStatusOrder(ctx as unknown as IJWTContext),
    {
      tags: ["Order"],
      detail: {
        summary: "Atualiza um pedido",
        description: "Atualiza um pedido",
        params: {
          id: "ID do pedido"
        }
      },
      body: t.Object({
        order: t.Object({
          status: t.String()
        })
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
  .onBeforeHandle((ctx) => middleware.validate(ctx as unknown as IJWTContext))
  .delete(
    "/order/delete/:id", (ctx) => controller.delete(ctx as unknown as IJWTContext),
    {
      tags: ["Order"],
      detail: {
        summary: "Deleta um pedido",
        description: "Deleta um pedido",
        params: {
          id: "ID do pedido"
        }
      },
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
  router as RouteOrder,
  clients as ClientsWebSocket
}
