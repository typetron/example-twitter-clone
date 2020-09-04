import { Controller, Middleware, Patch, Post } from '@Typetron/Router';
import { Inject } from '@Typetron/Container';
import { AuthUser } from '@Typetron/Framework/Auth';
import { User } from 'App/Entities/User';
import { AuthMiddleware } from '@Typetron/Framework/Middleware';
import { UserForm } from 'App/Forms/UserForm';
import { Storage } from '@Typetron/Storage';

@Controller('user')
@Middleware(AuthMiddleware)
export class UserController {

    @AuthUser()
    user: User;

    @Inject()
    storage: Storage;

    @Patch()
    async update(form: UserForm) {
        if (form.photo) {
            form.photo = await this.storage.put(form.photo, 'public');
        }
        if (form.cover) {
            form.cover = await this.storage.put(form.cover, 'public');
        }
        await this.user.save(form);
        return this.user;
    }

    @Post(':User')
    async follow(userToFollow: User) {
        await this.user.followers.attach(userToFollow.id);
        await this.user.save();
        return this.user;
    }

    @Post(':User')
    async unfollow(userToUnfollow: User) {
        await this.user.followers.detach(userToUnfollow.id);
        await this.user.save();
    }
}
