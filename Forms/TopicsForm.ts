import { Field, Form, Rules } from '@Typetron/Forms'
import { Required } from '@Typetron/Validation'

export class TopicsForm extends Form {
    @Field()
    @Rules(Required)
    topics: number[] = []
}
