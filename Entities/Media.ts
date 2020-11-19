import { Column, Entity, Options, PrimaryColumn, Relation } from '@Typetron/Database'
import { Tweet } from './Tweet'
import { BelongsTo } from '@Typetron/Database/Fields'

@Options({
    table: 'media'
})
export class Media extends Entity {
    @PrimaryColumn()
    id: number

    @Column()
    path: string

    @Relation(() => Tweet, 'media')
    tweet: BelongsTo<Tweet>
}
