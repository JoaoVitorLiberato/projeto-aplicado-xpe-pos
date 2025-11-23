import { Context } from "elysia";
import { JWTOption } from "@elysiajs/jwt"

export interface IJWTContext extends Context {
  security: {
    sign: (payload: any, secret?: string, options?: JWTOption) => Promise<string>;
    verify: (token: string) => Promise<boolean | null>;
  }
}
