import { Context } from "elysia";
import { container } from "tsyringe";
import { ComplementService } from "../../../Application/Services/ComplementService.application.service";
import { Complement } from "../../../Domain/Entities/Complement.domain.entities";

// Dependencies
import "../../../Shared/Containers/Controllers/ComplementContainer.shared.containers.controller";

export class ComplementController {
  private service = container.resolve(ComplementService);

  create = async ({ body, set }: Context) => {
    try {
      const responseService = await this.service.create(body as Complement);

      if (responseService && responseService.codigo && /^(error-create-complement)$/i.test(String(responseService.codigo))) set.status = 400;

      return responseService;
    } catch (error) {
      console.error("[ERROR ComplementController]", error);
      set.status = 500;
      return "Server Error";
    }
  }

  views = async ({ set }: Context) => {
    try {
      const responseService = await this.service.views();

      if (responseService && responseService.codigo && /^(error-views-complement)$/i.test(String(responseService.codigo))) set.status = 400;

      return responseService;
    } catch (error) {
      console.error("[ERROR ComplementController]", error);
      set.status = 500;
      return "Server Error";
    }
  }

  viewById = async ({ params, set }: Context) => {
    try {
      const responseService = await this.service.viewById(params.id as string);

      if (responseService && responseService.codigo && /^(complement-not-found)$/i.test(String(responseService.codigo))) set.status = 404;
      if (responseService && responseService.codigo && /^(error-view-complement)$/i.test(String(responseService.codigo))) set.status = 400;

      return responseService;
    } catch (error) {
      console.error("[ERROR ComplementController]", error);
      set.status = 500;
      return "Server Error";
    }
  }

  update = async ({ body, params, set }: Context) => {  
    try {
      const responseService = await this.service.update(params.id as string, body as Complement);

      if (responseService && responseService.codigo && /^(error-update-complement)$/i.test(String(responseService.codigo))) set.status = 400;
      if (responseService && responseService.codigo && /^(complement-not-found)$/i.test(String(responseService.codigo))) set.status = 404;

      return responseService;
    } catch (error) {
      console.error("[ERROR ComplementController]", error);
      set.status = 500;
      return "Server Error";
    }
  }

  delete = async ({ params, set }: Context) => {
    try {
      const responseService = await this.service.delete(params.id as string);

      if (responseService && responseService.codigo && /^(error-delete-complement)$/i.test(String(responseService.codigo))) set.status = 400;
      if (responseService && responseService.codigo && /^(complement-not-found)$/i.test(String(responseService.codigo))) set.status = 404;

      return responseService;
    } catch (error) {
      console.error("[ERROR ComplementController]", error);
      set.status = 500;
      return "Server Error";
    }
  }
}