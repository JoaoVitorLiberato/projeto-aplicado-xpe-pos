import { inject, injectable } from "tsyringe";
import { IGatewayPort } from "../../Domain/Ports/Gateways/GatewayPort.domain.ports.gateways";
import { Order } from "../../Domain/Entities/Order.domain.entities";
import { Gateway } from "../../Domain/Entities/Gateway.domain.entities";
import { GatewayFactory } from "../../Domain/Factory/GatewayFactory.domain.factory";

interface IGatewayUse extends IGatewayPort {}

@injectable()
export class GatewayUseCase {
  constructor (
    @inject ("IGatewayPort") private gateway: IGatewayUse) {}

  async execute (order: Order): Promise<any> {
    return await this.gateway.create(order);
  }

  async validate (data: Gateway): Promise<any> {
    const dto = GatewayFactory.save(data);
    return await this.gateway.validate(dto);
  }
}
