import { suite, test } from '@testdeck/mocha'
import { expect } from 'chai'
import { TestCase } from 'Test/TestCase'
import { File } from '@Typetron/Storage'
import { User } from 'App/Entities/User'
import { User as UserModel } from '@Data/Models/User'

@suite
class UserControllerTest extends TestCase {
    private user: User

    async before() {
        await super.before()
        await this.actingAs(this.user = await this.createUser())
    }

    @test
    async updatesUser() {
        const photo = new File('avatar.jpg')
        photo.directory = 'test'
        photo.saved = true
        const cover = new File('cover.jpg')
        cover.directory = 'test'
        cover.saved = true
        const response = await this.put('users.update', {
            name: 'Joe Joe',
            bio: `joe's bio`,
            username: 'joe',
            photo,
            cover,
        })
        expect(response.body).to.deep.include({
            username: 'joe',
            name: 'Joe Joe',
            bio: `joe's bio`,
        })
    }

    @test
    async canFollowUser() {
        const user = await this.createUser({
            name: 'Joe Joeeeee',
            bio: `joe's biooooo`,
        })

        const response = await this.post<UserModel>(['users.follow', {User: user.id}])
        expect(response.body).to.deep.include({
            username: this.user.username,
            id: this.user.id,
        })
        expect(response.body.following).to.have.length(1)
    }
}
