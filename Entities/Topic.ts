import { BelongsToMany, Column, Entity, HasMany, Options, PrimaryColumn, Relation } from '@Typetron/Database'
import { User } from 'App/Entities/User'
import { Hashtag } from 'App/Entities/Hashtag'

@Options({
    table: 'topics'
})
export class Topic extends Entity {
    @PrimaryColumn()
    id: number

    @Column()
    name: string

    @Relation(() => User, 'topics')
    enthusiasts: BelongsToMany<User> // `followers` can be used as well but it will be confused with user.followers

    @Relation(() => Hashtag, 'topic')
    hashtags: HasMany<Hashtag>
}
