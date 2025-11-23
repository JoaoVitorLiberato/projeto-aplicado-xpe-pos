import { container } from "tsyringe";
import { ICloudfireBucketPort } from "../../../Domain/Ports/Storages/ICloudFirePort.domain.ports.storages";
import { BucketCloudfireAdapter } from "../../../Infrastructure/Adapters/External/Storage/StorageBangalo.infrastructure.adapters.external.storage";
import { InternalNotificationServiceAdapter } from "../../../Infrastructure/Adapters/Internal/Notifications/InternalNotificationAdapter.infrastructure.adapters";

container.register<ICloudfireBucketPort>("ICloudfireBucketPort", {
  useClass: BucketCloudfireAdapter
});

container.registerSingleton<InternalNotificationServiceAdapter>(InternalNotificationServiceAdapter);
container.registerSingleton<BucketCloudfireAdapter>(BucketCloudfireAdapter);