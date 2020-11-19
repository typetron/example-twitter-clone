import { Field, Model } from '@Typetron/Models'

export class Topic extends Model {
    @Field()
    id: number

    @Field()
    name: string
}
