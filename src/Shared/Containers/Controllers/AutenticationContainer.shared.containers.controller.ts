import { container } from "tsyringe";
import { AutenticationService } from "../../../Application/Services/AutenticationService.application.service";
import { AutenticationUserCase } from "../../../Application/Usecases/AutenticationUseCase.application.usecases";
import { InternalNotificationServiceAdapter } from "../../../Infrastructure/Adapters/Internal/Notifications/InternalNotificationAdapter.infrastructure.adapters";
import { AutenticationRepository } from "../../../Infrastructure/Repositories/Autentication.infrastructure.repositories";
import { IAutenticationRepository } from "../../../Domain/Ports/Repositories/IAuthenticationRepositoryPort.domain.ports.repostories";

container.register<IAutenticationRepository>("IAutenticationRepository", { useClass: AutenticationRepository });

container.registerSingleton<AutenticationUserCase>(AutenticationUserCase);
container.registerSingleton<AutenticationRepository>(AutenticationRepository);
container.registerSingleton<InternalNotificationServiceAdapter>(InternalNotificationServiceAdapter);
container.registerSingleton<AutenticationService>(AutenticationService);