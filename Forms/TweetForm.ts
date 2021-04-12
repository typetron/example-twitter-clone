import { Field, Form, Rules } from '@Typetron/Forms'
import { Required } from '@Typetron/Validation'
import { File } from '@Typetron/Storage'

export class TweetForm extends Form {

    @Field()
    @Rules(Required)
    content: string

    @Field()
    media: File | File[] = []
}
