import { CreatedAt, Entity, Options, PrimaryColumn, Relation } from '@Typetron/Database';
import { Tweet } from 'App/Entities/Tweet';
import { User } from 'App/Entities/User';
import { BelongsTo } from '@Typetron/Database/Fields';

@Options({
    table: 'likes'
})
export class Like extends Entity {
    @PrimaryColumn()
    id: number;

    @Relation(() => Tweet, 'likes')
    tweet: BelongsTo<Tweet>;

    @Relation(() => User, 'likes')
    user: BelongsTo<User>;

    @CreatedAt()
    createdAt: Date;
}
