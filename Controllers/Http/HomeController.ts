import { Controller, Get, Middleware, Query } from '@Typetron/Router'
import { Tweet } from 'App/Entities/Tweet'
import { Tweet as TweetModel } from 'App/Models/Tweet'
import { AuthMiddleware } from '@Typetron/Framework/Middleware'
import { User } from 'App/Entities/User'
import { AuthUser } from '@Typetron/Framework/Auth'
import { Hashtag } from 'App/Entities/Hashtag'

@Controller()
@Middleware(AuthMiddleware)
export class HomeController {

    @AuthUser()
    user: User

    @Get()
    async tweets(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
        const followings = await this.user.following.get()
        const tweets = this.getTweetsQuery(page, limit).whereIn('userId', followings.pluck('id').concat(this.user.id))

        return TweetModel.from(tweets.get())
    }

    @Get('explore')
    async explore(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
        await this.user.load('topics')
        const userHashtags = await Hashtag.whereIn('topic', this.user.topics.items.pluck('id')).get()
        const tweets = this.getTweetsQuery(page, limit)
        if (userHashtags.length) {
            tweets.whereIn(
                'id',
                query => query.table('hashtags_tweets').select('tweetId').whereIn('hashTagId', userHashtags.pluck('id'))
            )
        }

        return TweetModel.from(tweets.get())
    }

    @Get(':username/tweets')
    async userTweets(username: string, @Query('page') page: number = 1, @Query('limit') limit: number = 10) {
        const user = await User.where('username', username).first()

        if (!user) {
            throw new Error('User not found')
        }

        const tweets = this.getTweetsQuery(page, limit).where('userId', user.id)

        return TweetModel.from(tweets.get())
    }

    getTweetsQuery(page: number, limit: number) {
        return Tweet
            .with(
                'user',
                'media',
                'replyParent.user',
                'retweetParent.user',
                ['likes', query => query.where('userId', this.user.id)]
            )
            .withCount('likes', 'replies', 'retweets')
            .orderBy('createdAt', 'DESC')
            .limit((page - 1) * limit, limit)
    }
}
