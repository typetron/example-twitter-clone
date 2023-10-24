import { suite, test } from '@testdeck/mocha'
import { expect } from 'chai'
import { TestCase } from 'Tests/TestCase'
import { Http } from '@Typetron/Router/Http'

@suite
class AuthControllerTest extends TestCase {

    @test
    async login() {
        const response = await this.post('login')
        expect(response.status).to.be.equal(Http.Status.UNPROCESSABLE_ENTITY)
    }
}
