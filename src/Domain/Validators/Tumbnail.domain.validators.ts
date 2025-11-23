export class Thumbnail {
  public readonly url: string;
  public readonly upload: boolean;

  constructor(url: string, upload: boolean) {
    if ((!url || url.trim() === "") && upload) {
      throw new Error("URL da imagem inválida.");
    }

    this.url = url;
    this.upload = upload;
  }

  getValue() {
    return {
      url: this.url,
      upload: this.upload
    }
  }
}