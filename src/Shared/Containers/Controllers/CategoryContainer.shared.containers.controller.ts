import { container } from "tsyringe";
import { ICategoryRepository } from "../../../Domain/Ports/Repositories/ICategoryRepositoryPort.domain.ports.repostories";
import { CategoryRepository } from "../../../Infrastructure/Repositories/Category.infrastructure.repositories";
import { InternalNotificationServiceAdapter } from "../../../Infrastructure/Adapters/Internal/Notifications/InternalNotificationAdapter.infrastructure.adapters";
import { CategoryUseCase } from "../../../Application/Usecases/CategoryUseCase.application.usecases";
import { CategoryService } from "../../../Application/Services/CategoryService.application.service";

container.register<ICategoryRepository>("ICategoryRepository", { useClass: CategoryRepository });

container.registerSingleton<InternalNotificationServiceAdapter>(InternalNotificationServiceAdapter);
container.registerSingleton<CategoryUseCase>(CategoryUseCase);
container.registerSingleton<CategoryRepository>(CategoryRepository);
container.registerSingleton<CategoryService>(CategoryService);