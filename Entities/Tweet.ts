import {
    BelongsTo,
    BelongsToMany,
    Column,
    CreatedAt,
    Entity,
    HasMany,
    Options,
    PrimaryColumn,
    Relation
} from '@Typetron/Database'
import { User } from './User'
import { Like } from './Like'
import { Media } from './Media'
import { Notification } from 'App/Entities/Notification'
import { Hashtag } from 'App/Entities/Hashtag'

@Options({
    table: 'tweets'
})
export class Tweet extends Entity {
    @PrimaryColumn()
    id: number

    @Column()
    content: string

    @Relation(() => Media, 'tweet')
    media: HasMany<Media>

    @Relation(() => User, 'tweets')
    user: BelongsTo<User>

    @Relation(() => Like, 'tweet')
    likes: HasMany<Like>

    @Relation(() => Tweet, 'replies')
    replyParent: BelongsTo<Tweet>

    @Relation(() => Tweet, 'retweets')
    retweetParent: BelongsTo<Tweet>

    @Relation(() => Tweet, 'replyParent')
    replies: HasMany<Tweet>

    @Relation(() => Tweet, 'retweetParent')
    retweets: HasMany<Tweet>

    @Relation(() => Notification, 'tweet')
    notifications: HasMany<Notification>

    @Relation(() => Hashtag, 'tweets')
    hashtags: BelongsToMany<Hashtag>

    @CreatedAt()
    createdAt: Date
}
