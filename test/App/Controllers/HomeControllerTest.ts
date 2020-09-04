import { suite, test } from '@testdeck/mocha';
import { expect } from 'chai';
import { TestCase } from 'Test/TestCase';

@suite
class HomeControllerTest extends TestCase {

    @test
    async showsLatestTweets() {
        const response = await this.get('home');
        expect(response.content).to.be.instanceOf(Array);
    }
}
