import { Context } from "elysia";
import { container } from "tsyringe";
import { CategoryService } from "../../../Application/Services/CategoryService.application.service";
import { Category } from "../../../Domain/Entities/Cotegory.domain.entities";

// Dependencies
import "../../../Shared/Containers/Controllers/CategoryContainer.shared.containers.controller";

export class CategoryController {
  private service = container.resolve(CategoryService);

  create = async ({ body, set }: Context) => {
    try {
      const responseService = await this.service.create(body as Category);

      if (responseService && responseService.codigo && /^(error-create-category)$/i.test(String(responseService.codigo))) set.status = 400;

      return responseService;
    } catch (error) {
      console.error("[ERROR CategoryController]", error);
      set.status = 500;
      return "Server Error";
    }
  }

  views = async ({ set }: Context) => {
    try {
      const responseService = await this.service.views();

      if (responseService && responseService.codigo && /^(error-views-category)$/i.test(String(responseService.codigo))) set.status = 400;
      if (responseService && responseService.codigo && /^(categories-not-found)$/i.test(String(responseService.codigo))) set.status = 404;

      return responseService;
    } catch (error) {
      console.error("[ERROR CategoryController]", error);
      set.status = 500;
      return "Server Error";
    }
  }

  viewById = async ({ params, set }: Context) => {
    try {
      const responseService = await this.service.viewById(params.id as string);

      if (responseService && responseService.codigo && /^(category-not-found)$/i.test(String(responseService.codigo))) set.status = 404;
      if (responseService && responseService.codigo && /^(error-view-category)$/i.test(String(responseService.codigo))) set.status = 400;

      return responseService;
    } catch (error) {
      console.error("[ERROR CategoryController]", error);
      set.status = 500;
      return "Server Error";
    }
  }

  update = async ({ body, params, set }: Context) => {  
    try {
      const responseService = await this.service.update(params.id as string, body as Category);

      if (responseService && responseService.codigo && /^(category-not-found)$/i.test(String(responseService.codigo))) set.status = 404;
      if (responseService && responseService.codigo && /^(error-update-category)$/i.test(String(responseService.codigo))) set.status = 400;

      return responseService;
    } catch (error) {
      console.error("[ERROR CategoryController]", error);
      set.status = 500;
      return "Server Error";
    }
  }

  delete = async ({ params, set }: Context) => {
    try {
      const responseService = await this.service.delete(params.id as string);

      if (responseService && responseService.codigo && /^(category-not-found)$/i.test(String(responseService.codigo))) set.status = 404;
      if (responseService && responseService.codigo && /^(error-delete-category)$/i.test(String(responseService.codigo))) set.status = 400;

      return responseService;
    } catch (error) {
      console.error("[ERROR CategoryController]", error);
      set.status = 500;
      return "Server Error";
    }
  }
}