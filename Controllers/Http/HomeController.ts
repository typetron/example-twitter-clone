import { Controller, Get } from '@Typetron/Router';
import { Tweet } from 'App/Entities/Tweet';
import { Tweet as TweetModel } from 'App/Models/Tweet';

@Controller()
export class HomeController {

    @Get()
    async home() {
        const tweets = await Tweet
            .with('user', 'replies')
            // .withCount('likes')
            .whereNull('parentId')
            .orderBy('createdAt', 'DESC')
            .get();
        return TweetModel.fromMany(tweets);
    }
}
