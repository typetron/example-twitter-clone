import { Field, Model } from '@Typetron/Models';

export class User extends Model {
    @Field()
    id: number;

    @Field()
    username: string;

    @Field()
    name: string;

    @Field()
    photo: string;
}
