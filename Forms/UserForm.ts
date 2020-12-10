import { Field, Form, Rules } from '@Typetron/Forms'
import { Image } from '@Typetron/Storage'
import { Required } from '@Typetron/Validation'

export class UserForm extends Form {
    @Field()
    name?: string

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
