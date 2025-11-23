import { container } from "tsyringe";
import { Context } from "elysia";

import { IJWTContext } from "../Types/IJWTContext.presentation.http.types";
import { AutenticationService } from "../../../Application/Services/AutenticationService.application.service";
import { Authentication } from "../../../Domain/Entities/Autentication.domain.entities";

// Dependencies
import "../../../Shared/Containers/Controllers/AutenticationContainer.shared.containers.controller"

export class AutenticationController {
  private service = container.resolve(AutenticationService);

  async login (ctx: IJWTContext) {
    try {
      const dto = ctx.body as Authentication;
      const ResponseService = await this.service.login(dto.email, dto.password, ctx);

      if (/^(error-autentication-user)$/i.test(String(ResponseService.codigo))) ctx.set.status = 401;
      if (/^(error-login-user)$/i.test(String(ResponseService.codigo))) ctx.set.status = 400;

      return ResponseService;
    } catch (error) {
      ctx.set.status = 500;
      console.error("ERROR - AutenticationController", error);
      return "Erro Server";
    }
  }
}