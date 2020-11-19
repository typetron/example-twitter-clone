import { Field, FieldMany, Model } from '@Typetron/Models'
import { User } from './User'
import { Media } from './Media'
import { Like } from './Like'

export class Tweet extends Model {
    @Field()
    id: number

    @Field()
    content: string

    @Field()
    user: User

    @Field()
    likesCount = 0

    @FieldMany(Like)
    likes: Like[] = []

    @Field()
    retweetsCount = 0

    @Field()
    replyParent?: Tweet

    @Field()
    retweetParent?: Tweet

    @Field()
    repliesCount = 0

    @FieldMany(Media)
    media: Media[] = []

    @Field()
    createdAt: Date
}
