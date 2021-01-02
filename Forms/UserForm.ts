import { Field, Form, Rules } from '@Typetron/Forms'
import { File } from '@Typetron/Storage'
import { Required } from '@Typetron/Validation'
import { IsUsername } from 'App/Validators/IsUsername'

export class UserForm extends Form {
    @Field()
    @Rules(Required)
    name: string

    @Field()
    @Rules(Required, IsUsername)
    username: string

    @Field()
    bio?: string

    @Field()
    photo?: File | string

    @Field()
    cover?: File | string
}
