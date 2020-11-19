import { Field, Model } from '@Typetron/Models'
import { User } from './User'

export class Like extends Model {
    @Field()
    id: number

    @Field()
    user: User
}
