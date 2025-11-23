import { container } from "tsyringe";
import { IGatewayPort } from "../../../Domain/Ports/Gateways/GatewayPort.domain.ports.gateways";
import { InternalNotificationServiceAdapter } from "../../../Infrastructure/Adapters/Internal/Notifications/InternalNotificationAdapter.infrastructure.adapters";
import { InfinitePayAdapter } from "../../../Infrastructure/Adapters/Internal/Gateways/InfinitePayAdapter.infrastructur.adapters.internal.gateways";
import { OrderService } from "../../../Application/Services/OrderService.application.service";
import { IOrderServicesContract } from "../../../Application/Contracts/IOrderServicesContract.application.contracts";
import { GatewayUseCase } from "../../../Application/Usecases/GatewayUseCase.application.usecases";
import { GatewayService } from "../../../Application/Services/GatewayService.service.application.service";

container.register<IOrderServicesContract>("IOrderServicesContract", { useClass: OrderService });
container.register<IGatewayPort>("IGatewayPort", { useClass: InfinitePayAdapter });

container.registerSingleton<InfinitePayAdapter>(InfinitePayAdapter); 
container.registerSingleton<InternalNotificationServiceAdapter>(InternalNotificationServiceAdapter); 
container.registerSingleton<GatewayUseCase>(GatewayUseCase);
container.registerSingleton<GatewayService>(GatewayService);