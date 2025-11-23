export interface ICloudfireBucketPort {
  upload (file: File): Promise<{ path: string }|any>;
}
