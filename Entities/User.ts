import { BelongsToMany, BelongsToManyOptions, Column, HasMany, Options, Relation } from '@Typetron/Database'
import { User as Authenticatable } from '@Typetron/Framework/Auth'
import { Tweet } from 'App/Entities/Tweet'
import { Like } from 'App/Entities/Like'
import { Notification } from 'App/Entities/Notification'
import { Topic } from 'App/Entities/Topic'

@Options({
    table: 'users'
})
export class User extends Authenticatable {
    @Column()
    name: string

    @Column()
    username: string

    @Column()
    bio: string

    @Column()
    photo: string

    @Column()
    cover: string

    @Relation(() => Like, 'user')
    likes: HasMany<Like>

    @Relation(() => Tweet, 'user')
    tweets: HasMany<Tweet>

    @Relation(() => Notification, 'user')
    notifications: HasMany<Notification>

    @Relation(() => Notification, 'notifiers')
    activity: BelongsToMany<Notification>

    @Relation(() => Topic, 'enthusiasts')
    topics: BelongsToMany<Topic>

    @Relation(() => User, 'following')
    @BelongsToManyOptions({
        table: 'followers',
        column: 'followerId',
        foreignColumn: 'followingId'
    })
    followers: BelongsToMany<User>

    @Relation(() => User, 'followers')
    @BelongsToManyOptions({
        table: 'followers',
        column: 'followingId',
        foreignColumn: 'followerId'
    })
    following: BelongsToMany<User>
}
