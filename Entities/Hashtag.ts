import { BelongsTo, Column, Entity, Options, PrimaryColumn, Relation } from '@Typetron/Database'
import { Topic } from 'App/Entities/Topic'

@Options({
    table: 'hashtags'
})
export class Hashtag extends Entity {
    @PrimaryColumn()
    id: number

    @Column()
    name: string

    @Relation(() => Topic, 'hashtags')
    topic: BelongsTo<Topic>
}
