import { Category } from "../Entities/Cotegory.domain.entities";
import { Name } from "../Validators/Name.domain.validators";

export class CategoryFactory {
  static save (props: Category): Category {
    const NAME = new Name(props.name);

    return new Category(
      props.icon,
      NAME.getValue(),
    );
  }
}