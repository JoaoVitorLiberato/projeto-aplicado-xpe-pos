import { container } from "tsyringe";
import { ProductService } from "../../../Application/Services/ProductService.application.service";
import { InternalNotificationServiceAdapter } from "../../../Infrastructure/Adapters/Internal/Notifications/InternalNotificationAdapter.infrastructure.adapters";
import { ProductUserCase } from "../../../Application/Usecases/ProductUserCase.application.usecases";
import { ProductRepository } from "../../../Infrastructure/Repositories/Product.infrastructure.repositories";
import { IProductRepository } from "../../../Domain/Ports/Repositories/IProductRepositoryPort.domain.ports.repostories";

import { ICategoriesServicesContract } from "../../../Application/Contracts/ICategoriesServices.application.contracts";
import { CategoryService } from "../../../Application/Services/CategoryService.application.service";

// dependencia da storage
import "../Adapters/StorageBangalo.shared.containers.adapters"

container.register<IProductRepository>("IProductRepository", { useClass: ProductRepository });
container.register<ICategoriesServicesContract>("ICategoriesServicesContract", { useClass: CategoryService })

container.registerSingleton<InternalNotificationServiceAdapter>(InternalNotificationServiceAdapter);
container.registerSingleton<ProductUserCase>(ProductUserCase);
container.registerSingleton<ProductRepository>(ProductRepository);
container.registerSingleton<ProductService>(ProductService);
