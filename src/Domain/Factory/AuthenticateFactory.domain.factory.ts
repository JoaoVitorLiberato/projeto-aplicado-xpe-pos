import { Authentication } from "../Entities/Autentication.domain.entities";
import { Email } from "../Validators/Email.domain.validators"
import { Password } from "../Validators/Password.domain.validators";

export class AuthenticationFactory {
  static save (props: Authentication) {
    const EMAIL = new Email(props.email).getValue();
    const PASSWORD = new Password(props.password).getValue()

    return new Authentication(
      EMAIL,
      PASSWORD
    )
  }
}