import { Column, CreatedAt, Entity, Options, PrimaryColumn, Relation, UpdatedAt } from '@Typetron/Database';
import { User } from 'App/Entities/User';
import { Like } from 'App/Entities/Like';
import { BelongsTo, HasMany } from '@Typetron/Database/Fields';

@Options({
    table: 'tweets'
})
export class Tweet extends Entity {
    @PrimaryColumn()
    id: number;

    @Column()
    content: string;

    @Relation(() => Tweet, 'replies')
    parent: BelongsTo<Tweet>;

    @Relation(() => Tweet, 'parent')
    replies: HasMany<Tweet>;

    @Relation(() => User, 'tweets')
    user: BelongsTo<User>;

    @Relation(() => Like, 'tweet')
    likes: HasMany<Like>;

    @CreatedAt()
    createdAt: Date;

    @UpdatedAt()
    updatedAt: Date;
}
