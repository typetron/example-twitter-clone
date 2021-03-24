import { Controller, Delete, Get, Middleware, Post } from '@Typetron/Router'
import { Tweet } from 'App/Entities/Tweet'
import { TweetForm } from 'App/Forms/TweetForm'
import { User } from 'App/Entities/User'
import { AuthMiddleware } from '@Typetron/Framework/Middleware'
import { AuthUser } from '@Typetron/Framework/Auth'
import { Like } from 'App/Entities/Like'
import { Tweet as TweetModel } from '@Data/Models/Tweet'
import { Inject } from '@Typetron/Container'
import { File, Storage } from '@Typetron/Storage'
import { Http, HttpError } from '@Typetron/Web'
import { Notification } from 'App/Entities/Notification'
import { Hashtag } from 'App/Entities/Hashtag'
import { Media } from 'App/Entities/Media'
import { EntityObject } from '@Typetron/Database'

@Controller('tweets')
@Middleware(AuthMiddleware)
export class TweetsController {

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
        return TweetModel.from(replies)
    }

    @Post()
    async tweet(form: TweetForm) {
        return TweetModel.from(this.createTweet(form))
    }

    @Post(':Tweet/reply')
    async reply(parent: Tweet, form: TweetForm) {
        const tweet = await this.createTweet(form, {replyParent: parent})

        await this.addTweetNotification(tweet, parent, 'reply')

        return TweetModel.from(tweet)
    }

    @Post(':Tweet/retweet')
    async retweet(parent: Tweet, form: TweetForm) {
        const tweet = await this.createTweet(form, {retweetParent: parent})

        await this.addTweetNotification(tweet, parent, 'reply')

        return TweetModel.from(tweet)
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
            await notification?.notifiers.remove(this.user.id)
        } else {
            await like.save()
            await notification?.notifiers.add(this.user.id)
        }

        await tweet.loadCount('likes', 'replies', 'retweets')
        await tweet.load('media', 'likes', 'user', 'retweetParent.user')

        return TweetModel.from(tweet)
    }

    private async createTweet(form: TweetForm, additional: Partial<EntityObject<Tweet>> = {}) {
        const tweet = new Tweet({...form, ...additional})
        await this.user.tweets.save(tweet)

        if (form.media instanceof File) {
            form.media = [form.media]
        }

        const mediaFiles = await Promise.all(
            form.media.map(file => this.storage.save(file, 'public/tweets-media'))
        )
        await tweet.media.save(...mediaFiles.map(media => new Media({path: media})))

        await this.addHashTags(tweet)
        await this.sendMentionNotifications(tweet)

        await tweet.load('user')
        return tweet
    }

    private async addTweetNotification(tweet: Tweet, parentTweet: Tweet, type: 'reply' | 'retweet') {
        const parentTweetUser = parentTweet.user.get()
        /**
         * We need to create a 'reply' notification if the user that replied the tweet is not its author.
         */
        if (parentTweetUser && parentTweetUser?.id !== this.user.id) {
            await this.addNotification(tweet, parentTweetUser.id, type)
        }
    }

    private async addHashTags(tweet: Tweet) {
        const hashtagsList = tweet.content.matchAll(/\B#(\w\w+)\b/gm)
        const hashtagsNames = Array.from(hashtagsList).map(hashtag => hashtag[1])
        const hashtags = await Hashtag.whereIn('name', hashtagsNames).get()

        await tweet.hashtags.sync(...hashtags.pluck('id'))
    }

    private async sendMentionNotifications(tweet: Tweet) {
        const mentionsList = tweet.content.matchAll(/\B@(\w\w+)\b/gm)
        const usernames = Array.from(mentionsList).map(mention => mention[1])
        const users = await User.whereIn('username', usernames).get()
        for (const user of users) {
            await this.addNotification(tweet, user.id, 'mention')
        }
    }

    private async addNotification(tweet: Tweet, userId: number, type: Notification['type']) {
        const notification = await Notification.create({
            user: userId,
            type,
            tweet
        })
        await notification.notifiers.add(this.user.id)
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
