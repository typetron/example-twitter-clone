import { Controller, Delete, Get, Middleware, Post } from '@Typetron/Router'
import { Tweet } from 'App/Entities/Tweet'
import { TweetForm } from 'App/Forms/TweetForm'
import { User } from 'App/Entities/User'
import { AuthMiddleware } from '@Typetron/Framework/Middleware'
import { AuthUser } from '@Typetron/Framework/Auth'
import { Like } from 'App/Entities/Like'
import { Tweet as TweetModel } from '@Data/Models/Tweet'
import { Inject } from '@Typetron/Container'
import { Storage } from '@Typetron/Storage'
import { Media } from 'App/Entities/Media'
import { Http, HttpError } from '@Typetron/Web'
import { Notification } from 'App/Entities/Notification'

@Controller('tweet')
@Middleware(AuthMiddleware)
export class TweetController {

    @AuthUser()
    user: User

    @Inject()
    storage: Storage

    @Get(':Tweet')
    async get(tweet: Tweet) {
        await tweet.loadCount('likes', 'replies', 'retweets')
        await tweet.load('user', 'media', 'retweetParent.user')
        return TweetModel.from(tweet)
    }

    @Get(':id/replies')
    async replies(tweet: number) {
        const replies = await Tweet
            .with('user', 'media')
            .withCount('likes', 'replies', 'retweets')
            .where('replyParentId', tweet)
            .get()
        return TweetModel.fromMany(replies)
    }

    @Post()
    async create(form: TweetForm) {
        const tweet = new Tweet(form)
        await this.user.tweets.save(tweet)

        const mediaFiles = await Promise.all(
            form.media.map(file => this.storage.put(file, 'public/tweets-media'))
        )
        await tweet.media.save(...mediaFiles.map(media => new Media({path: media})))

        /**
         * When the replyParent property is sent, it means the user replied this tweet.
         */
        if (form.replyParent) {
            await this.addNotification(tweet, form.replyParent, 'reply')
        }

        /**
         * When the retweetParent property is sent, it means the user retweeted this tweet.
         */
        if (form.retweetParent) {
            await this.addNotification(tweet, form.retweetParent, 'retweet')
        }

        await tweet.load('user')
        return TweetModel.from(tweet)
    }

    private async addNotification(tweet: Tweet, parent: number, type: 'reply' | 'retweet') {
        const retweetParent = await Tweet.find(parent)
        const retweetUser = retweetParent?.user.get()
        /**
         * we need to create a 'reply' notification if the user that replied the tweet is not its author.
         */
        if (retweetUser && retweetUser.id !== this.user.id) {
            const notification = await Notification.firstOrCreate({
                type: type,
                user: retweetUser.id,
                readAt: undefined,
                tweet
            })
            await notification.notifiers.attach(this.user.id)
        }
    }

    @Post(':Tweet/like')
    async like(tweet: Tweet) {
        let notification: Notification | undefined
        /**
         * Check to see if the tweet's user is not its author because
         * we don't want to send a notification to its author
         */
        if (tweet.user.get()?.id !== this.user.id) {
            notification = await Notification.firstOrCreate({
                type: 'like',
                user: tweet.user.get(),
                readAt: undefined,
                tweet
            })
        }

        const like = await Like.firstOrNew({tweet, user: this.user})
        if (like.exists) {
            await like.delete()
            await notification?.notifiers.detach(this.user.id)
        } else {
            await like.save()
            await notification?.notifiers.attach(this.user.id)
        }

        await tweet.loadCount('likes', 'replies', 'retweets')
        await tweet.load('media', 'likes', 'user', 'retweetParent.user')

        return TweetModel.from(tweet)
    }

    @Delete(':Tweet')
    async delete(tweet: Tweet) {
        if (this.user.id !== tweet.user.get()?.id) {
            throw new HttpError('You are not the author of this tweet', Http.Status.UNAUTHORIZED)
        }
        await tweet.delete()
        return TweetModel.from(tweet)
    }
}
