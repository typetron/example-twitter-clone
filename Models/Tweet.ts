import { Field, FieldMany, Model } from '@Typetron/Models';
import { User } from './User';

export class Tweet extends Model {
    @Field()
    id: number;

    @Field()
    content: string;

    @Field()
    user: User;

    @Field()
    likes: number;

    @Field()
    retweets: number;

    @Field()
    comments: number;

    @Field()
    parent?: Tweet;

    @Field()
    @FieldMany(Tweet)
    replies: Tweet[];

    @Field()
    createdAt: Date;
}
