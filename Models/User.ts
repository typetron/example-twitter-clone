import { Field, FieldMany, Model } from '@Typetron/Models'
import { Topic } from './Topic'

export class User extends Model {
    @Field()
    id: number

    @Field()
    username: string

    @Field()
    name: string

    @Field()
    photo: string

    @Field()
    cover: string

    @Field()
    bio?: string

    @Field()
    followersCount = 0

    @Field()
    followingCount = 0

    @FieldMany(User)
    followers: User[] = []

    @FieldMany(User)
    following: User[] = []

    @FieldMany(Topic)
    topics: Topic[] = []
}
