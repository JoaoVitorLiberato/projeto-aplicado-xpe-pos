import { injectable } from "tsyringe";
import axios from "axios";
import { IGatewayPort } from "../../../../Domain/Ports/Gateways/GatewayPort.domain.ports.gateways";
import { Gateway } from "../../../../Domain/Entities/Gateway.domain.entities";
import { Order } from "../../../../Domain/Entities/Order.domain.entities";
import { InternalNotificationServiceAdapter } from "../Notifications/InternalNotificationAdapter.infrastructure.adapters";

@injectable()
export class InfinitePayAdapter implements IGatewayPort {
  private readonly notify = new InternalNotificationServiceAdapter();

  async create (order: Order): Promise<any> {
    try {
      const CART = [];

      for (const product of order.itemsCarts) {
        CART.push({
          name: product.name,
          amount: product.total,
          quantity: 1
        })
      }

      CART.push({
        name: "Frete",
        amount: order.pagamento.valorFrete,
        quantity: 1
      })

      const ADDRESS = `address_cep=${order.endereco.cep}&address_complement=${order.endereco.complemento}&address_number=${order.endereco.numero}&address_neighborhood=${order.endereco.bairro}&address_city=${order.endereco.cidade}&address_state=${order.endereco.uf}`;

      return await this.notify.send({
        link: `${process.env.INFINITE_PAY_CHECKOUT}/${process.env.INFINITE_PAY_HANDLE}?items=${encodeURIComponent(JSON.stringify(CART))}&order_nsu=${order.id}&redirect_url=https://bangalosushi.app.br/detalhes/pedido&customer_name=${order.nome}&customer_cellphone=${order.telefone}&${encodeURIComponent(JSON.stringify(ADDRESS))}`
      });
    } catch (error) {
      console.error("[ERROR InfinitePayAdapter create]", error);
      return await this.notify.send({
        codigo: "error-generate-link-payment-infinity-pay",
        mensagem: "Houve um erro ao tentar gerar o link de pagamento."
      });
    }
  }

  async validate (data: Gateway): Promise<any> {
    try {
      const {
        transaction_id,
        slug,
        order_nsu
      } = data;

      const responseInfinitePay = await axios
        .get(`${process.env.INFINITE_PAY_API}/${process.env.INFINITE_PAY_HANDLE}?transaction_nsu=${transaction_id}&slug=${slug}&external_order_nsu=${order_nsu}`)

      return await this.notify.send({
        ...responseInfinitePay.data
      });
    } catch (error: unknown) {
      console.error("[ERROR InfinitePayAdapter - validate]", error instanceof Error ? error.message : 'Unknown error');
      return await this.notify.send({
        codigo: "error-validate-payment-adapter"
      });
    }
  }
}
