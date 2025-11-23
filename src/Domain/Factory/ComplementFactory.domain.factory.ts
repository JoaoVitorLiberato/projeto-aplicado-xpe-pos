import { Complement } from "../Entities/Complement.domain.entities";
import { Name } from "../Validators/Name.domain.validators";
import { Description } from "../Validators/Description.domain.validators";
import { Price } from "../Validators/Price.domain.validators";
import { Qtd } from "../Validators/Qtd.domain.validators";

export class ComplementFactory {
  static save (props: Complement): Complement {
    const NAME = new Name(props.name);
    const DESCRIPTION = new Description(props.description);
    const PRICE = new Price(Number(props.price));
    const PRICE_TOTAL = props.total ? new Price(props.total) : undefined;
    const QTD = props.quantity ? new Qtd(props.quantity) : undefined;

    return new Complement(
      NAME.getValue(), 
      DESCRIPTION.getValue(),
      PRICE.getValue(),
      PRICE_TOTAL?.getValue(),
      QTD?.getValue()
    );
  }
}