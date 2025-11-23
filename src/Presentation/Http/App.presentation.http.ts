import { Elysia } from "elysia";
import Redis from "ioredis";
import { swagger } from "@elysiajs/swagger";
import { cors } from "@elysiajs/cors";
import "reflect-metadata";
import dotenv from "dotenv";
import { jwt } from "@elysiajs/jwt"

import { ConnectDatabase } from "../../Infrastructure/Database/ConnectDb.infrastructure.database";
import { AutenticationApp } from "../Http/Middlewares/AuthenticationApp.presentation.http.middlewares";
import { WebSocketAdapter } from "../../Infrastructure/Adapters/Internal/WebSocket/WebSocketAdapter.infrastructure.adapter";
import { RedisSubscribe } from "../../Infrastructure/Redis/Redis.Subscribe.infrastructure.redis";

import { RouteOrder, ClientsWebSocket } from "./Routes/Order.presentation.http.routes";
import { RouteAutentication } from "./Routes/Autentication.presentation.http.routes";
import { RouteComplement } from "./Routes/Complement.presentation.http.routes";
import { RouteCategory } from "./Routes/Category.presentation.http.routes";
import { RouteProduct } from "./Routes/Product.presentation.http.routes";
import { RouteGateway } from "./Routes/Gateway.presentation.http.routes";
import { RouterItemsCart } from "./Routes/ItemsCart.presentation.http.routes";
import { RouterUser } from "./Routes/User.presentation.http.routes";

dotenv.config()
export const App = new Elysia({
  serve: {
    idleTimeout: 60,
    reusePort: true
  }
})
  .use(cors({
    origin: String(process.env.NODE_ENV) === "development" ? "http://localhost:8081" : "https://bangalosushi.app.br",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "x-api-key"],
    credentials: true,
    maxAge: 600,
    preflight: true
  }))

App.onBeforeHandle((ctx) => AutenticationApp(ctx))

App.use(jwt({
  name: "security",
  secret: process.env.APPLICATION_SECRET_KEY as string,
}))

App.use(
  swagger({
    documentation: {
      info: {
        title: "Bangalô API Documentation",
        version: "2.0.0",
        description: "API Documentation for Bangalô"
      },
      tags: [
        { name: "Authentication", description: "Rotas de autenticação" },
        { name: "User", description: "Rotas de usuários" },
        { name: "Order", description: "Rotas de pedidos" },
        { name: "Complement", description: "Rotas de complementos" },
        { name: "Category", description: "Rotas de categorias" },
        { name: "Product", description: "Rotas de produtos" },
        { name: "Gateway", description: "Rotas de pagamento" },
        { name: "Items", description: "Rotas para itens do carrinho" },
      ],
      components: {
        securitySchemes: {
          apiKey: {
            type: 'apiKey',
            name: 'x-api-key',
            in: 'header'
          },
          authorization: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            description: 'JWT Authorization header using the Bearer scheme'
          }
        }
      }
    },
    swaggerOptions: {
      persistAuthorization: true
    }
  })
)

App.onStart(() => ConnectDatabase())

App.group("", (app) =>
  app
    .use(RouterItemsCart)
    .use(RouteOrder)
    .use(RouteComplement)
    .use(RouteCategory)
    .use(RouteProduct)
    .use(RouteGateway)
    .use(RouterUser)
    .use(RouteAutentication)
);

// WebSocket
const webSocketAdapter = new WebSocketAdapter(ClientsWebSocket);
const redisClient = new Redis({ host: "redis", port: 6379 });
const setupOrderNotifications = new RedisSubscribe(redisClient, webSocketAdapter)
setupOrderNotifications.subscribe()