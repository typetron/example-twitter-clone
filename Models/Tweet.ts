import { Field, Model } from '@Typetron/framework/Models';

export class TweetUser extends Model {
    @Field()
    id: number;

    @Field()
    username: string;

    @Field()
    name: string;

    @Field()
    photo: string;
}

export class Tweet extends Model {
    @Field()
    id: number;

    @Field()
    content: string;

    @Field()
    user: TweetUser;

    @Field()
    parent: Tweet;

    @Field()
    replies: Tweet[];

    @Field()
    createdAt: Date;
}

