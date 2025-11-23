import { injectable } from "tsyringe";
import { ICloudfireBucketPort } from "../../../../Domain/Ports/Storages/ICloudFirePort.domain.ports.storages";
import { InternalNotificationServiceAdapter } from "../../Internal/Notifications/InternalNotificationAdapter.infrastructure.adapters";
import { CloudFireBucketConfig } from "../../../Buckets/CloudfireBucket.infrastructure.bucket";
import { PutObjectCommand } from "@aws-sdk/client-s3";

@injectable()
export class BucketCloudfireAdapter implements ICloudfireBucketPort {
  private readonly notification = new InternalNotificationServiceAdapter();

  async upload (file: File): Promise<any> {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);

      await CloudFireBucketConfig.send(
        new PutObjectCommand({
          Bucket: "bangalo-bucket",
          Key: file.name,
          ContentType: file.type,
          Body: uint8Array
        })
      );

      return this.notification.send({
        path: `https://pub-7e624c1a56154a32a83e1ae55ed6de58.r2.dev/${file.name}`
      });
    } catch (error) {
      console.error("ERROR [BucketCloudfireAdapter - upload]", error);
      return await this.notification.send({
        codigo: "error-upload-image",
        mensagem: "Houve um erro ao tentar fazer o upload."
      });
    }
  }
}
