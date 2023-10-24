import { suite, test } from '@testdeck/mocha'
import { expect } from 'chai'
import { TestCase } from 'Tests/TestCase'
import { Tweet } from 'App/Entities/Tweet'

@suite
class TweetControllerTest extends TestCase {

    async before() {
        await super.before()
        await this.actingAs(await this.createUser())
    }

    @test
    async createsTweet() {
        const response = await this.post('tweets.tweet', {
            content: 'this is a tweet test'
        })
        expect(response.body).to.deep.include({
            content: 'this is a tweet test',
        })
    }

    @test
    async repliesToTweet() {
        const tweet = await Tweet.create({content: 'tweet'}) as Tweet
        const response = await this.post(['tweets.reply', {Tweet: tweet.id}], {
            content: 'this is a reply'
        })
        expect(response.body).to.deep.include({
            content: 'this is a reply',
        })
    }

    @test
    async likesTweet() {
        const tweet = await Tweet.create({
            content: 'some tweet'
        })
        const response = await this.post(['tweets.like', {Tweet: tweet.id}])
        const content = response.body as Tweet
        expect(content).to.deep.include({
            id: tweet.id
        })
        expect(content.likes).to.have.length(1)
    }
}
