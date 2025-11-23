import { container } from "tsyringe";
import { UserUseCase } from "../../../Application/Usecases/UserUseCase.application.usecases";
import { IUserRepository } from "../../../Domain/Ports/Repositories/IUserRepositoryPort.domain.ports.repostories";
import { UserService } from "../../../Application/Services/UserService.application.service";
import { InternalNotificationServiceAdapter } from "../../../Infrastructure/Adapters/Internal/Notifications/InternalNotificationAdapter.infrastructure.adapters";
import { UserRepository } from "../../../Infrastructure/Repositories/User.infrastructure.repositories";

// dependencia da storage
import "../Adapters/StorageBangalo.shared.containers.adapters"

container.register<IUserRepository>("IUserRepository", { useClass: UserRepository });

container.registerSingleton<UserRepository>(UserRepository);
container.registerSingleton<UserUseCase>(UserUseCase);
container.registerSingleton<InternalNotificationServiceAdapter>(InternalNotificationServiceAdapter);
container.registerSingleton<UserService>(UserService);
