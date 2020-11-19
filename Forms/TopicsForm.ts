import { Field, Form } from '@Typetron/Forms'

export class TopicsForm extends Form {
    @Field()
    topics: number[] = []
}
