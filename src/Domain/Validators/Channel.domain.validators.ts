export class Channel {
  private readonly channel: string;

  constructor(channel: string) {
    if (!channel || channel.trim() === '') {
      throw new Error("Canal é o obrigatório");
    }

    if (typeof channel !== 'string') {
      throw new Error("O tipo do canal pode ser apenas string.");
    }
    this.channel = channel;
  }

  getValue(): string {
    return this.channel;
  }
}