import { Controller, Get, Middleware, Post } from '@Typetron/Router';
import { Inject } from '@Typetron/Container';
import { Auth } from '@Typetron/Framework/Auth';
import { Tweet } from 'App/Entities/Tweet';
import { Tweet as TweetModel } from 'App/Models/Tweet';
import { TweetForm } from 'App/Forms/TweetForm';
import { User } from 'App/Entities/User';
import { AuthMiddleware } from '@Typetron/Framework/Middleware';

@Controller()
@Middleware(AuthMiddleware)
export class TweetController {

    @Inject()
    auth: Auth;

    @Post()
    async create(form: TweetForm) {
        const tweet = new Tweet(form);
        tweet.user = await this.auth.user<User>();
        await tweet.save();
        return TweetModel.from(tweet);
    }
}
