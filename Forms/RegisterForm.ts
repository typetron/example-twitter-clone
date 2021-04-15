import { Field, Form, Rules } from '@Typetron/Forms'
import { Email, MinLength, Required } from '@Typetron/Validation'
import { IsUsername } from 'App/Validators/IsUsername'

export class RegisterForm extends Form {

    @Field()
    @Rules(Required, Email)
    email: string

    @Field()
    @Rules(Required, IsUsername)
    username: string

    @Field()
    @Rules(Required, MinLength(6))
    password: string

    @Field()
    @Rules(Required('Password confirmation is required'))
    passwordConfirmation: string
}
