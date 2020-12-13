import { Field, Form, Rules } from '@Typetron/Forms'
import { Image } from '@Typetron/Storage'
import { Required } from '@Typetron/Validation'

export class UserForm extends Form {
    @Field()
    @Rules(
        Required
    )
    name?: string

    @Field()
    @Rules(
        Required
    )
    username?: string

    @Field()
    @Rules(
        Required
    )
    bio?: string

    @Field()
    photo?: Image | string

    @Field()
    cover?: Image | string

    @Field()
    topics: number[] = []
}
