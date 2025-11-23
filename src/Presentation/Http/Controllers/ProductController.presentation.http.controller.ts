import { container } from "tsyringe";
import { Context } from "elysia";

import { Product } from "../../../Domain/Entities/Product.domain.entities";
import { ProductService } from "../../../Application/Services/ProductService.application.service";

// Dependencies
import "../../../Shared/Containers/Controllers/ProductContainer.shared.containers.controller"

export class ProductController {
  private readonly service = container.resolve(ProductService);

  async create ({ body, set}: Context) {
    try {
      const FORMDATA = body as { product: string, image: File }
      const PRODUCT = JSON.parse(FORMDATA.product) as Product;
      const IMAGE = FORMDATA.image as File || null;

      const responseService = await this.service.create(PRODUCT, IMAGE);

      if (responseService && responseService.codigo && /^(error-create-product)$/i.test(String(responseService.codigo))) set.status = 400;
      if (responseService && responseService.codigo && /^(error-upload-image)$/.test(String(responseService.codigo))) set.status = 400;
      if (responseService && responseService.codigo && /^(category-not-found)$/.test(String(responseService.codigo))) set.status = 404;

      return responseService;
    } catch (error) {
      console.error("ERROR [ProductController]", error);
      set.status = 500;
      return "Erro Server";
    }
  }

  async views ({ set }: Context) {
    try {
      const responseService = await this.service.views();

      if (responseService && responseService.codigo && /^(error-views-product)$/i.test(responseService.codigo)) set.status = 400;
      if (responseService && responseService.codigo && /^(products-not-foud)$/i.test(responseService.codigo)) set.status = 404;

      return responseService;
    } catch (error) {
      console.error("ERROR [ProductController]", error);
      set.status = 500;
      return "Erro Server";
    }
  }

  async viewById ({ params, set }: Context) {
    try {
      console.log("teste")
      const responseService = await this.service.viewById(params.id);

      if (responseService && responseService.codigo && /^(error-view-by-id-product)$/i.test(responseService.codigo)) set.status = 400;
      if (responseService && responseService.codigo && /^(product-not-found)$/i.test(responseService.codigo)) set.status = 404;

      return responseService;
    } catch (error) {
      console.error("ERROR [ProductController]", error);
      set.status = 500
      return "Erro Server";
    }
  }

  async update ({ params, body, set }: Context) {
    try {
      const FORMDATA = body as { product: string, image: File };
      const PRODUCT = JSON.parse(FORMDATA.product) as Product;;
      const IMAGE = FORMDATA.image as File;

      const responseService = await this.service.update(params.id, PRODUCT, IMAGE);

      if (responseService && responseService.codigo && /^(error-update-product)$/i.test(responseService.codigo)) set.status = 400;
      if (responseService && responseService.codigo && /^(error-upload-image)$/i.test(responseService.codigo)) set.status = 400;
      if (responseService && responseService.codigo && /^(product-not-found)$/i.test(responseService.codigo)) set.status = 404;

      return responseService;
    } catch (error) {
      console.error("ERROR [ProductController]", error);
      set.status = 500;
      return "Erro Server";
    }
  }

  async delete ({ params, set }: Context) {
    try {
      const responseService = await this.service.delete(params.id);

      if (responseService && responseService.codigo && /^(error-delete-product)$/i.test(responseService.codigo)) set.status = 400;
      if (responseService && responseService.codigo && /^(product-not-found)$/i.test(responseService.codigo)) set.status = 404;

      return responseService;
    } catch (error) {
      console.error("ERROR [ProductController]", error);
      set.status = 500;
      return "Erro Server";
    }
  }
}

