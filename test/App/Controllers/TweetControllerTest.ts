import { suite, test } from '@testdeck/mocha';
import { expect } from 'chai';
import { TestCase } from 'Test/TestCase';
import { Tweet } from 'App/Entities/Tweet';

@suite
class TweetControllerTest extends TestCase {

    @test
    async createsTweet() {
        this.loginById(1);
        const response = await this.post('tweet.create', {
            content: 'this is a tweet test'
        });
        expect(response.content).to.deep.include({
            content: 'this is a tweet',
        });
    }

    @test
    async repliesToTweet() {
        this.loginById(1);
        const tweet = await Tweet.first() as Tweet;
        const response = await this.post(['tweet.reply', {Tweet: tweet.id}], {
            Tweet: tweet.id,
            content: 'this is a reply'
        });
        expect(response.content).to.deep.include({
            content: 'this is a reply',
        });
    }

    @test
    async likesTweet() {
        this.loginById(1);
        const tweet = await Tweet.create({
            content: 'some tweet'
        });
        const response = await this.post(['tweet.like', {Tweet: tweet.id}]);
        const content = response.content as Tweet;
        expect(content).to.deep.include({
            id: tweet.id
        });
        expect(content.likes).to.have.length(1);
    }
}
