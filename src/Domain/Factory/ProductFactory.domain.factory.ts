import { Product } from "../Entities/Product.domain.entities"
import { Name } from "../Validators/Name.domain.validators"
import { Thumbnail } from "../Validators/Tumbnail.domain.validators"
import { Description } from "../Validators/Description.domain.validators"
import { Price } from "../Validators/Price.domain.validators"


export class ProductFactory {
  static save (props: Product): Product {
    const TUMBNAIL = new Thumbnail(props.tumbnail.url, props.tumbnail.upload);
    const NAME = new Name(props.name);
    const DESCRIPTION = new Description(props.description);
    const PRICE = {
      default: new Price(props.price.default).getValue(),
      discount: props.price.discount
    };
    const DIFFERENCES = props.differences;
    const NOTE_CLIENT = props.note_client;
    const CATEGORY_ID = props.categoryId;

    return new Product(
      {
        url: TUMBNAIL.url,
        upload: props.tumbnail.upload,
      },
      NAME.getValue(), 
      DESCRIPTION.getValue(),
      CATEGORY_ID,
      NOTE_CLIENT,
      PRICE,
      DIFFERENCES,
    );
  }
}