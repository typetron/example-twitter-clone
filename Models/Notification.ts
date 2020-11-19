import { Field, Model } from '@Typetron/Models'
import { User } from './User'
import { Tweet } from './Tweet'

export class Notification extends Model {
    @Field()
    id: number

    @Field()
    type: 'follow' | 'like' | 'retweet'

    @Field()
    notifiers: User[] = []

    @Field()
    tweet: Tweet
}
