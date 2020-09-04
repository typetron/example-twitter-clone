import { Field, Form, Rules } from '@Typetron/Forms';
import { Required } from '@Typetron/Validation';

export class LoginForm extends Form {

    @Field()
    @Rules(
        Required
    )
    username: string;

    @Field()
    @Rules(
        Required,
    )
    password: string;
}
