import { Controller, Get, Middleware, Query } from '@Typetron/Router'
import { Tweet } from 'App/Entities/Tweet'
import { Tweet as TweetModel } from 'App/Models/Tweet'
import { AuthMiddleware } from '@Typetron/Framework/Middleware'
import { User } from 'App/Entities/User'
import { AuthUser } from '@Typetron/Framework/Auth'
import { EntityQuery } from '@Typetron/Database/EntityQuery'

@Controller()
@Middleware(AuthMiddleware)
export class HomeController {

    @AuthUser()
    user: User

    @Get()
    async tweets(@Query('page') page: number = 1, @Query('username') username?: string) {
        const followings = await this.user.following.get()
        const tweets: EntityQuery<Tweet> = Tweet
            .with(
                'user',
                'media',
                'replyParent.user',
                'retweetParent.user',
                ['likes', query => query.where('userId', this.user.id)]
            )
            .whereIn('userId', followings.pluck('id').concat(this.user.id))
            .withCount('likes', 'replies', 'retweets')
            .orderBy('createdAt', 'DESC')
            .limit((page - 1) * 10, 10)

        let user: User | undefined

        if (username && (user = await User.where('username', username).first())) {
            tweets.where('userId', user.id)
        }

        return TweetModel.fromMany(await tweets.get())
    }
}
