import Redis from "ioredis";
import { IEventSubscribe } from "../../Application/Contracts/IEventSubscribe.application.contracts";
import { IWebSocketPort } from "../../Domain/Ports/WebSocket/IWebSocket.domain.ports.websocket";

export class RedisSubscribe implements IEventSubscribe {
  private _channel = process.env.APPLICAITON_REDIS_CHANNEL;

  constructor (
    private readonly redisClient: Redis,
    private readonly webSocket: IWebSocketPort
  ) {}

  async subscribe (): Promise<void> {
    await this.redisClient.subscribe(String(this._channel));

    this.redisClient.on(
      "message",
      (channelClient: any, message:any) => {
        if (this._channel === channelClient) {
          this.webSocket.broadcast(message);
        }
      });
  }
}