
import { container } from "tsyringe";
import { ItemsCartService } from "../../../Application/Services/ItemsCartService.application.service";
import { ItemsCart } from "../../../Domain/Entities/ItemsCart.domain.entities";
import { IJWTContext } from "../Types/IJWTContext.presentation.http.types";

// Dependencies
import "../../../Shared/Containers/Controllers/ItemsCartContainer.shared.containers.controller"

export class ItemsCartController {
  private service = container.resolve(ItemsCartService)

  async create ({ body, set }: IJWTContext) {
    try {
      const ResponseService = await this.service.create(body as ItemsCart);
      if (/^(error-create-items-cart)$/i.test(String(ResponseService.codigo))) set.status = 400;

      return ResponseService;
    } catch (error) {
      set.status = 500;
      console.error("ERROR - ItemsCartController - create", error);
      return "Erro Server";
    }
  }

  async views ({ set }: IJWTContext) {
    try {
      const ResponseService = await this.service.views()

      if (/^(error-views-items-cart)$/i.test(String(ResponseService.codigo))) set.status = 400;
      if (/^(items-cart-not-fount)$/i.test(String(ResponseService.codigo))) set.status = 404;

      return ResponseService;
    } catch (error) {
      set.status = 500;
      console.error("ERROR - ItemsCartController - views", error);
      return "Erro Server";
    }
  }

  async viewById ({ set, params }: IJWTContext) {
    try {
      const ResponseService = await this.service.viewById(params.id)

      if (/^(error-find-by-items-cart)$/i.test(String(ResponseService.codigo))) set.status = 400;
      if (/^(item-cart-not-fount)$/i.test(String(ResponseService.codigo))) set.status = 404;

      return ResponseService;
    } catch (error) {
      set.status = 500;
      console.error("ERROR - ItemsCartController - viewById", error);
      return "Erro Server";
    }
  }

  async update ({ set, params, body }: IJWTContext) {
    try {
      const { id } = params

      const ResponseService = await this.service.update(id, body as ItemsCart)

      if (/^(error-update-items-cart)$/i.test(String(ResponseService.codigo))) set.status = 400;
      if (/^(item-cart-not-fount)$/i.test(String(ResponseService.codigo))) set.status = 404;

      return ResponseService;
    } catch (error) {
      set.status = 500;
      console.error("ERROR - ItemsCartController - update", error);
      return "Erro Server";
    }
  }  

  async delete ({ set, params, body }: IJWTContext) {
    try {
      const { id } = params

      const ResponseService = await this.service.delete(id)

      if (/^(error-delete-items-cart)$/i.test(String(ResponseService.codigo))) set.status = 400;
      if (/^(item-cart-not-fount)$/i.test(String(ResponseService.codigo))) set.status = 404;

      return ResponseService;
    } catch (error) {
      set.status = 500;
      console.error("ERROR - ItemsCartController - delete", error);
      return "Erro Server";
    }
  }  
}
