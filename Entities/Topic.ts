import { BelongsToMany, Column, Entity, Options, PrimaryColumn, Relation } from '@Typetron/Database'
import { User } from 'App/Entities/User'

@Options({
    table: 'topic'
})
export class Topic extends Entity {
    @PrimaryColumn()
    id: number

    @Column()
    name: string

    @Relation(() => User, 'topics')
    enthusiasts: BelongsToMany<User> // `followers` can be used as well but it will be confused with user.followers
}
