
import { container } from "tsyringe";
import { OrderService } from "../../../Application/Services/OrderService.application.service";
import { Order } from "../../../Domain/Entities/Order.domain.entities";
import { IJWTContext } from "../Types/IJWTContext.presentation.http.types";

// Dependencies
import "../../../Shared/Containers/Controllers/OrderContainer.shared.containers.controller"

export class OrderController {
  private service = container.resolve(OrderService)

  async init ({ set }: IJWTContext) {
    try {
      const ResponseService = await this.service.init();
      if (/^(erro-init-order)$/i.test(String(ResponseService.codigo))) set.status = 400;

      return ResponseService;
    } catch (error) {
      set.status = 500;
      console.error("ERROR - OrderController - init", error);
      return "Erro Server";
    }
  }

  async create ({ body, set }: IJWTContext) {
    try {
      const ResponseService = await this.service.create(body as Order);
      if (/^(erro-create-order)$/i.test(String(ResponseService.codigo))) set.status = 400;

      return ResponseService;
    } catch (error) {
      set.status = 500;
      console.error("ERROR - OrderController - create", error);
      return "Erro Server";
    }
  }

  async views ({ set }: IJWTContext) {
    try {
      const ResponseService = await this.service.views();
      if (/^(error-views-order)$/i.test(String(ResponseService.codigo))) set.status = 400;

      return ResponseService;
    } catch (error) {
      set.status = 500;
      console.error("ERROR - OrderController - views", error);
      return "Erro Server";
    }
  }

  async viewById ({ params, set }: IJWTContext) {
    try {
      const ResponseService = await this.service.viewById(params.id as string);

      if (/^(error-view-by-id-order)$/i.test(String(ResponseService.codigo))) set.status = 400;
      if (/^(order-not-found)$/i.test(String(ResponseService.codigo))) set.status = 404;

      return ResponseService;
    } catch (error) {
      set.status = 500;
      console.error("ERROR - OrderController - viewById", error);
      return "Erro Server";
    }
  }

  async viewByPhone ({ params, set }: IJWTContext) {
    try {
      const ResponseService = await this.service.viewByPhone(params.phone as string);

      if (ResponseService && ResponseService.codigo && /^(order-not-found)$/i.test(String(ResponseService.codigo))) set.status = 404;
      if (ResponseService && ResponseService.codigo && /^(error-view-by-phone-order)$/i.test(String(ResponseService.codigo))) set.status = 400;

      console.log("teste", ResponseService)
      return ResponseService;
    } catch (error) {
      set.status = 500;
      console.error("ERROR - OrderController - viewByPhone", error);
      return "Erro Server";
    }
  }

  async viewToday ({ set }: IJWTContext) {
    try {
      const ResponseService = await this.service.viewToday();
      if (ResponseService && ResponseService.codigo && /^(error-view-today-order)$/i.test(String(ResponseService.codigo))) set.status = 400;

      return ResponseService;
    } catch (error) {
      set.status = 500;
      console.error("ERROR - OrderController - viewByPhone", error);
      return "Erro Server";
    }
  }

  async updateStatusOrder ({
    params,
    body,
    set
  }: IJWTContext) {
    try {
      const {
        order: {
          status
        }
      } = body as any

      const ResponseService = await this.service.updateStatusOrder(params.id as string, status);

      if (ResponseService && ResponseService.codigo && /^(error-update-order)$/i.test(String(ResponseService.codigo))) set.status = 400;
      if (ResponseService && ResponseService.codigo && /^(order-not-found)$/i.test(String(ResponseService.codigo))) set.status = 404;

      return ResponseService;
    } catch (error) {
      set.status = 500;
      console.error("ERROR - OrderController - update", error);
      return "Erro Server";
    }
  }

  async delete ({ params, set }: IJWTContext) {
    try {
      const ResponseService = await this.service.delete(params.id as string);

      if (ResponseService && ResponseService.codigo && /^(error-delete-order)$/i.test(String(ResponseService.codigo))) set.status = 400;
      if (ResponseService && ResponseService.codigo && /^(order-not-found)$/i.test(String(ResponseService.codigo))) set.status = 404;

      return ResponseService;
    } catch (error) {
      set.status = 500;
      console.error("ERROR - OrderController - delete", error);
      return "Erro Server";
    }
  }
}
