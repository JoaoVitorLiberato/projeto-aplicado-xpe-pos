import { User } from "../Entities/User.domain.entities";
import { Email } from "../Validators/Email.domain.validators";
import { Password } from "../Validators/Password.domain.validators";
import { Name } from "../Validators/Name.domain.validators";
import { Phone } from "../Validators/Phone.domain.validators";
import { Thumbnail } from "../Validators/Tumbnail.domain.validators";
import { Age } from "../Validators/Age.domain.validators";

export class UserFactory {
  static save (props: User): User {
    const EMAIL = new Email(props.email);
    const PASSWORD = new Password(props.password);
    const NAME = new Name(props.details.name);
    const AGE = new Age(props.details.age);
    const PHONE = new Phone(props.details.phone);
    const THUMBNAIL = props.details.thumbnail ? new Thumbnail(
      props.details.thumbnail.url,
      props.details.thumbnail.upload
    ) : new Thumbnail("", false);

    return new User(
      EMAIL.getValue(),
      PASSWORD.getValue(),
      {
        name: NAME.getValue(),
        age: AGE.getValue(),
        phone: PHONE.getValue(),
        thumbnail: {
          url: THUMBNAIL.getValue().url,
          upload: THUMBNAIL.getValue().upload
        }
      }
    );
  }
}