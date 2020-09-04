import { suite, test } from '@testdeck/mocha';
import { expect } from 'chai';
import { TestCase } from 'Test/TestCase';
import { File } from '@Typetron/Storage';
import { User } from 'App/Entities/User';

@suite
class UserControllerTest extends TestCase {

    @test
    async updatesUser() {
        this.loginById(1);
        const photo = new File('avatar.jpg');
        photo.directory = 'test';
        photo.saved = true;
        const cover = new File('cover.jpg');
        cover.directory = 'test';
        cover.saved = true;
        const response = await this.patch('user.update', {
            name: 'Joe Joe',
            bio: `joe's bio`,
            photo,
            cover,
        });
        expect(response.content).to.deep.include({
            name: 'Joe Joe',
            bio: `joe's bio`,
        });
    }

    @test
    async canFollowUser() {
        this.loginById(1);
        const user = await User.find(2);
        const response = await this.post(['user.follow', {User: user.id}]);
        expect(response.content).to.deep.include({
            name: 'Joe Joe',
            bio: `joe's bio`,
        });
    }
}
