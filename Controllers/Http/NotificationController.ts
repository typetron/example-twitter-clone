import { Controller, Get, Middleware, Post } from '@Typetron/Router'
import { AuthUser } from '@Typetron/Framework/Auth'
import { User } from 'App/Entities/User'
import { AuthMiddleware } from '@Typetron/Framework/Middleware'
import { Notification as NotificationModel } from 'App/Models/Notification'
import { Notification } from 'App/Entities/Notification'

@Controller('notification')
@Middleware(AuthMiddleware)
export class NotificationController {

    @AuthUser()
    user: User

    @Get()
    async get() {
        const notifications = await Notification
            .with('notifiers', 'tweet')
            .where('userId', this.user.id)
            .orderBy('createdAt').get()
        return NotificationModel.fromMany(notifications)
    }

    @Get('unread')
    async unread() {
        return await Notification.where('user', this.user.id).whereNull('readAt').count()
    }

    @Post('read')
    async markAsRead() {
        await Notification.where('user', this.user.id).whereNull('readAt').update('readAt', new Date())
    }
}
