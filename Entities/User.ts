import { Column, CreatedAt, ManyToMany, Meta, OneToMany } from '@Typetron/Database';
import { User as Authenticable } from '@Typetron/Framework/Auth';
import { Tweet } from 'App/Entities/Tweet';

@Meta({
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

    @OneToMany(() => Tweet, 'user')
    tweets: Tweet[];

    @ManyToMany(() => User, 'following', 'followers', 'following_id', 'follower_id')
    followers: User[];

    @ManyToMany(() => User, 'followers', 'followers', 'follower_id', 'following_id')
    following: User[];

    @CreatedAt()
    createdAt: Date;
}
