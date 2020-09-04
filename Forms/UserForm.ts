import { Field, Form } from '@Typetron/Forms';
import { Image } from '@Typetron/Storage';

export class UserForm extends Form {
    @Field()
    name?: string;

    @Field()
    username?: string;

    @Field()
    bio?: string;

    @Field()
    photo?: Image;

    @Field()
    cover?: Image;
}
