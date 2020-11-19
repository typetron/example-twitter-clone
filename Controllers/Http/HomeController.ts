import { Controller, Get, Middleware, Query } from '@Typetron/Router'
import { Tweet } from 'App/Entities/Tweet'
import { Tweet as TweetModel } from 'App/Models/Tweet'
import { AuthMiddleware } from '@Typetron/Framework/Middleware'
import { User } from 'App/Entities/User'
import { AuthUser } from '@Typetron/Framework/Auth'

@Controller()
@Middleware(AuthMiddleware)
export class HomeController {

    @AuthUser()
    user: User

    @Get()
    @Middleware(AuthMiddleware)
    async home(@Query('page') page: number = 1) {
        const tweets = await Tweet
            .with('media', 'retweetParent.user', 'user', ['likes', query => query.where('userId', this.user.id)])
            .withCount('likes', 'replies', 'retweets')
            .whereNull('replyParentId')
            .orderBy('createdAt', 'DESC')
            .limit((page - 1) * 10, 10)
            .get()
        return TweetModel.fromMany(tweets)
    }
}
