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
    followersCount?: number

    @Field()
    followingCount?: number

    @FieldMany(User)
    followers?: User[]

    @FieldMany(User)
    following?: User[]

    @FieldMany(Topic)
    topics?: Topic[]
}
