import { suite, test } from '@testdeck/mocha'
import { expect } from 'chai'
import { TestCase } from 'Test/TestCase'

@suite
class HomeControllerTest extends TestCase {

    async before() {
        await super.before()
        this.login(await this.createUser())
    }

    @test
    async showsLatestTweets() {
        const response = await this.get('tweets')
        expect(response.body).to.be.instanceOf(Array)
    }
}
