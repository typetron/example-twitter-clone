import { Column, CreatedAt, Entity, ID, ManyToOne, Meta, OneToMany } from '@Typetron/Database';
import { User } from 'App/Entities/User';

@Meta({
    table: 'tweets'
})
export class Tweet extends Entity {
    @Column()
    id: ID;

    @Column()
    content: string;

    @ManyToOne(() => Tweet, 'replies')
    parent: Tweet;

    @OneToMany(() => Tweet, 'parent')
    replies: Tweet[];

    @ManyToOne(() => User, 'tweets')
    user: User;

    @CreatedAt()
    createdAt: Date;

    @CreatedAt()
    updatedAt: Date;
}
