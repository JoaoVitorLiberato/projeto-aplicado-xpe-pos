import { IWebSocketPort } from "../../../../Domain/Ports/WebSocket/IWebSocket.domain.ports.websocket";

export class WebSocketAdapter implements IWebSocketPort {
  private clients: Set<WebSocket>;

  constructor (clients: Set<WebSocket>) {
    this.clients = clients;
  }

  broadcast (message: string): void {
    for (const client of this.clients) {
      try {
        client.send(message);
      } catch (error) {
        console.error("[ERROR WebSocketAdapter - broadcast]", error);
      }
    }
  }
}