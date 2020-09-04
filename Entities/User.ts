import { BelongsToManyOptions, Column, CreatedAt, Options, Relation } from '@Typetron/Database';
import { User as Authenticable } from '@Typetron/Framework/Auth';
import { Tweet } from 'App/Entities/Tweet';
import { Like } from 'App/Entities/Like';
import { BelongsToMany, HasMany } from '@Typetron/Database/Fields';

@Options({
    table: 'users'
})
export class User extends Authenticable {
    @Column()
    name: string;

    @Column()
    username: string;

    @Column()
    bio: string;

    @Column()
    photo: string;

    @Column()
    cover: string;

    @Relation(() => Like, 'user')
    likes: HasMany<Like>;

    @Relation(() => Tweet, 'user')
    tweets: HasMany<Tweet>;

    @Relation(() => User, 'following')
    @BelongsToManyOptions({
        table: 'followers',
        column: 'followerId',
        foreignColumn: 'followingId'
    })
    followers: BelongsToMany<User>;

    @Relation(() => User, 'followers')
    following: BelongsToMany<User>;

    @CreatedAt()
    createdAt: Date;

    getUsername = () => 'username';
}
