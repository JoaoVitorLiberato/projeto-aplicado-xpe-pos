import { container } from "tsyringe";
import { User } from "../../../Domain/Entities/User.domain.entities";
import { UserService } from "../../../Application/Services/UserService.application.service";
import { IJWTContext } from "../Types/IJWTContext.presentation.http.types";

// dependencies
import "../../../Shared/Containers/Controllers/UserContainer.shared.containers.controller"

export class UserController {
  private service = container.resolve(UserService)

  async create ({ body, set }: IJWTContext) {
    try {
      const FORMDATA = body as { user: string, image?: File };
      const USER = JSON.parse(FORMDATA.user) as User;
      const IMAGE = FORMDATA.image as File;
  
      const responseService = await this.service.create(USER, IMAGE);
      if (/^(error-upload-image)$/i.test(String(responseService.codigo))) set.status = 400;
      if (/^(erro-create-user|email-already-exist)$/i.test(String(responseService.codigo))) set.status = 400;

      return responseService;
    } catch (error) {
      console.error("ERROR [UserController - create]", error);
      set.status = 500;
      return "Erro Server";
    }
  }

  async views ({ set }: IJWTContext) {
    try {  
      const responseService = await this.service.views();

      if (/^(error-find-users)$/i.test(String(responseService.codigo))) set.status = 400;

      return responseService;
    } catch (error) {
      console.error("ERROR [UserController - view]", error);
      set.status = 500;
      return "Erro Server";
    }
  } 

  async viewById ({ set, params }: IJWTContext) {
    try {  
      const { id } = params;
      const responseService = await this.service.viewById(id);

      if (/^(error-find-by-user)$/i.test(String(responseService.codigo))) set.status = 400;
      if (/^(user-not-found)$/i.test(String(responseService.codigo))) set.status = 404;

      return responseService;
    } catch (error) {
      console.error("ERROR [UserController - view]", error);
      set.status = 500;
      return "Erro Server";
    }
  }

  async update ({ set, body, params }: IJWTContext) {
    try {  
      const { id } = params;

      const FORMDATA = body as { user: string, image?: File }
      const USER = JSON.parse(FORMDATA.user) as User
      const IMAGE = FORMDATA.image as File;

      const responseService = await this.service.update(id, USER, IMAGE);

      if (/^(error-upload-image)$/i.test(String(responseService.codigo))) set.status = 400;
      if (/^(erro-update-user|email-already-exist)$/i.test(String(responseService.codigo))) set.status = 400;
      if (/^(user-not-found)$/i.test(String(responseService.codigo))) set.status = 404;

      return responseService;
    } catch (error) {
      console.error("ERROR [UserController - view]", error);
      set.status = 500;
      return "Erro Server";
    }
  }

  async delete ({ set, params }: IJWTContext) {
    try {  
      const { id } = params;

      const responseService = await this.service.delete(id);
      
      if (/^(erro-delete-user)$/i.test(String(responseService.codigo))) set.status = 400;
      if (/^(user-not-found)$/i.test(String(responseService.codigo))) set.status = 404;

      return responseService;
    } catch (error) {
      console.error("ERROR [UserController - view]", error);
      set.status = 500;
      return "Erro Server";
    }
  }
}
