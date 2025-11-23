import { Order } from "../Entities/Order.domain.entities";
import { Channel } from "../Validators/Channel.domain.validators";
import { Name } from "../Validators/Name.domain.validators";
import { Segment } from "../Validators/Segment.domain.validators";
import { Status } from "../Validators/Status.domain.validators";
import { Phone } from "../Validators/Phone.domain.validators";
import { Address } from "../Validators/Address.domain.validators";

export class OrderFactory {
  static save (props: Order): Order {
    const ID = props.id
    const CANAL = new Channel(props.canal).getValue();
    const NOME = new Name(props.nome).getValue();
    const SEGMENTO = new Segment(props.segmento).getValue();
    const STATUS = new Status(props.status).getValue();
    const TELEFONE = new Phone(props.telefone).getValue();
    const ENDERECO = new Address(props.endereco).getValue();
    const MENSAGEM = props.mensagem;
    const PAGAMENTO = props.pagamento;
    const ANALYTICS = props.analytics;
    const CREATED_AT = props.createdAt;
    const UPDATED_AT = props.updatedAt;

    return new Order(
      ID,
      CANAL,
      NOME,
      SEGMENTO,
      STATUS,
      TELEFONE,
      MENSAGEM,
      PAGAMENTO,
      ENDERECO,
      ANALYTICS,
      CREATED_AT,
      UPDATED_AT
    );
  }
}
