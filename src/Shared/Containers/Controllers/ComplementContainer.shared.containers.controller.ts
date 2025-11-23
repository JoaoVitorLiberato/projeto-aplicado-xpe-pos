import { container } from "tsyringe";

import { ComplementRepository } from "../../../Infrastructure/Repositories/Complement.infrastructure.repositories";
import { InternalNotificationServiceAdapter } from "../../../Infrastructure/Adapters/Internal/Notifications/InternalNotificationAdapter.infrastructure.adapters";
import { ComplementUseCase } from "../../../Application/Usecases/ComplementUseCase.application.usecases";
import { ComplementService } from "../../../Application/Services/ComplementService.application.service";
import { IComplementRepository } from "../../../Domain/Ports/Repositories/IComplementRepositoryPort.domain.ports.repostories";

container.register<IComplementRepository>("IComplementRepository", { useClass: ComplementRepository });

container.registerSingleton<InternalNotificationServiceAdapter>(InternalNotificationServiceAdapter);
container.registerSingleton<ComplementUseCase>(ComplementUseCase);
container.registerSingleton<ComplementRepository>(ComplementRepository);
container.registerSingleton<ComplementService>(ComplementService);