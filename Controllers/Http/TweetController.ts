import { Controller, Get, Middleware, Post } from '@Typetron/Router';
import { Tweet } from 'App/Entities/Tweet';
import { TweetForm } from 'App/Forms/TweetForm';
import { User } from 'App/Entities/User';
import { AuthMiddleware } from '@Typetron/Framework/Middleware';
import { AuthUser } from '@Typetron/Framework/Auth';
import { Like } from 'App/Entities/Like';
import { Tweet as TweetModel } from '@Data/Models/Tweet';

@Controller('tweet')
@Middleware(AuthMiddleware)
export class TweetController {

    @AuthUser()
    user: User;

    @Get(':Tweet')
    async get(tweet: Tweet) {
        return tweet.load('replies', 'user');
    }

    @Post()
    async create(form: TweetForm) {
        const tweet = new Tweet(form);
        await this.user.tweets.save(tweet);
        return TweetModel.from(tweet);
    }

    @Post(':Tweet')
    async reply(tweet: Tweet, form: TweetForm) {
        const reply = new Tweet(form);
        reply.user.set(this.user);
        await tweet.replies.save(reply);
        return reply;
    }

    @Post(':Tweet/like')
    async like(tweet: Tweet) {
        const like = await Like.firstOrNew({tweet, user: this.user});
        if (like.exists) {
            await like.delete();
        } else {
            await like.save();
        }

        await tweet.load('likes');
        return tweet;
    }
}
