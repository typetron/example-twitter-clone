import { Field, Form, Rules } from '@Typetron/Forms';
import { Required } from '@Typetron/Validation';

export class TweetForm extends Form {

    @Field()
    @Rules(
        Required,
    )
    content: string;

    @Field()
    parent: number;
}
