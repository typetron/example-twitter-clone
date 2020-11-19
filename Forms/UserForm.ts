import { Field, Form } from '@Typetron/Forms'
import { Image } from '@Typetron/Storage'

export class UserForm extends Form {
    @Field()
    name?: string

    @Field()
    bio?: string

    @Field()
    photo?: Image | string

    @Field()
    cover?: Image | string

    @Field()
    topics: number[] = []
}
