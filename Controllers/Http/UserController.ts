import { Controller, Get, Middleware, Patch, Post } from '@Typetron/Router'
import { Inject } from '@Typetron/Container'
import { AuthUser } from '@Typetron/Framework/Auth'
import { User } from 'App/Entities/User'
import { AuthMiddleware } from '@Typetron/Framework/Middleware'
import { UserForm } from 'App/Forms/UserForm'
import { User as UserModel } from 'App/Models/User'
import { File, Storage } from '@Typetron/Storage'
import { TopicsForm } from 'App/Forms/TopicsForm'
import { Notification } from '../../Entities/Notification'

@Controller('user')
@Middleware(AuthMiddleware)
export class UserController {

    @AuthUser()
    user: User

    @Inject()
    storage: Storage

    @Get(':username/followers')
    async followers(username: string) {
        const user = await User.with('followers').where('username', username).first()
        if (!user) {
            throw new Error('User not found')
        }
        return UserModel.fromMany(user.followers)
    }

    @Get(':username/following')
    async following(username: string) {
        const user = await User.with('following').where('username', username).first()
        if (!user) {
            throw new Error('User not found')
        }
        return UserModel.fromMany(user.following)
    }

    @Patch()
    async update(form: UserForm) {
        if (form.photo instanceof File) {
            await this.storage.delete(`public/${this.user.photo}`)
            form.photo = await this.storage.put(form.photo, 'public')
        }
        if (form.cover instanceof File) {
            await this.storage.delete(`public/${this.user.cover}`)
            form.cover = await this.storage.put(form.cover, 'public')
        }
        await this.user.save(form)
        return UserModel.from(this.user)
    }

    @Post('follow/:User')
    async follow(userToFollow: User) {
        await this.user.following.attach(userToFollow.id)

        const notification = await Notification.firstOrCreate({
            type: 'follow',
            user: userToFollow,
            readAt: undefined
        })

        if (!await notification.notifiers.has(this.user.id)) {
            await notification.notifiers.attach(this.user.id)
        }

        return UserModel.from(this.user)
    }

    @Post('unfollow/:User')
    async unfollow(userToUnfollow: User) {
        await this.user.following.detach(userToUnfollow.id)
        return UserModel.from(this.user)
    }

    @Get('topics')
    async getTopics() {
        return this.user.topics.get()
    }

    @Post('topics')
    async setTopics(form: TopicsForm) {
        await this.user.topics.sync(...form.topics)
    }

    @Get(':username')
    async get(username: string) {
        const user = await User.withCount('followers', 'following').where('username', username).first()
        if (!user) {
            throw new Error('User not found')
        }
        return UserModel.from(user)
    }

}
