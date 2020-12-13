import { Column, CreatedAt, Entity, Enum, Options, PrimaryColumn, Relation, UpdatedAt } from '@Typetron/Database'
import { User } from 'App/Entities/User'
import { BelongsTo, BelongsToMany } from '@Typetron/Database/Fields'
import { Tweet } from 'App/Entities/Tweet'

@Options({
    table: 'notifications'
})
export class Notification extends Entity {
    @PrimaryColumn()
    id: number

    @Column()
    @Enum('follow', 'like', 'retweet')
    type: 'follow' | 'like' | 'retweet'

    @Relation(() => User, 'notifications')
    user: BelongsTo<User>

    @Relation(() => User, 'activity')
    notifiers: BelongsToMany<User>

    @Relation(() => Tweet, 'notifications')
    tweet: BelongsTo<Tweet>

    @Column()
    readAt: Date

    @CreatedAt()
    createdAt: Date

    @UpdatedAt()
    updatedAt: Date
}