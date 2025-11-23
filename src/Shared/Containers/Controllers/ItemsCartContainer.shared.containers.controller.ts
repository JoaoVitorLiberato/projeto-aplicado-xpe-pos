import { container } from "tsyringe";
import { IItemsCartrRepositoryPort } from "../../../Domain/Ports/Repositories/IItemsCartrRepositoryPort.domain.ports.repostories";
import { ItemsCartService } from "../../../Application/Services/ItemsCartService.application.service";
import { ItemsCartUseCase } from "../../../Application/Usecases/ItemsCartUsecase.application.usecases";
import { ItemsCartRepository } from "../../../Infrastructure/Repositories/ItemsCart.infrastructure.repositories";
import { InternalNotificationServiceAdapter } from "../../../Infrastructure/Adapters/Internal/Notifications/InternalNotificationAdapter.infrastructure.adapters";

container.register<IItemsCartrRepositoryPort>("IItemsCartrRepositoryPort", { useClass: ItemsCartRepository })

container.registerSingleton<InternalNotificationServiceAdapter>(InternalNotificationServiceAdapter)
container.registerSingleton<ItemsCartUseCase>(ItemsCartUseCase)
container.registerSingleton<ItemsCartRepository>(ItemsCartRepository)
container.registerSingleton<ItemsCartService>(ItemsCartService)
