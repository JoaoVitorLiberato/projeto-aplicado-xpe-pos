import { S3Client } from "@aws-sdk/client-s3";

export const CloudFireBucketConfig = new S3Client({
  region: String(process.env.BUCKET_CLOUDFIRE_REGION),
  endpoint: String(process.env.BUCKET_CLOUDFIRE_URL),
  credentials: {
    accessKeyId: String(process.env.BUCKET_CLOUDFIRE_ID),
    secretAccessKey: String(process.env.BUCKET_CLOUDFIRE_SECRET_KEY)
  }
})
