import { User } from '@Data/Models/User'
import { Notification } from '@Data/Models/Notification'
import { Tweet } from '@Data/Models/Tweet'

export interface NotificationTemplate {
    icon: string
    title: string
    users: User[]
    tweet?: Tweet
}

export abstract class BaseNotificationTemplate implements NotificationTemplate {
    abstract icon: string
    abstract titleSuffix: string

    constructor(public notification: Notification) {}

    get title(): string {
        const users = this.notification.notifiers
        return users.length === 1
            ? `${users[0].name} ${this.titleSuffix}`
            : users.length === 2
                ? `${users[0].name} and ${users[1].name} ${this.titleSuffix}`
                : `${users[0].name} and ${users.length - 1} others ${this.titleSuffix}`
    }

    get users(): User[] {
        return this.notification.notifiers
    }

    get tweet(): Tweet {
        return this.notification.tweet
    }

    abstract get url(): string
}

export class LikeNotification extends BaseNotificationTemplate implements NotificationTemplate {
    icon = 'like'
    titleSuffix = 'liked your tweet'

    get url(): string {
        return `/tweet/${this.tweet.id}`
    }
}

export class RetweetNotification extends BaseNotificationTemplate implements NotificationTemplate {
    icon = 'retweet'
    titleSuffix = 'retweeted your tweet'

    get url(): string {
        return `/tweet/${this.tweet.id}`
    }
}

export class ReplyNotification extends BaseNotificationTemplate implements NotificationTemplate {
    icon = 'comment'
    titleSuffix = 'replied on your tweet'

    get url(): string {
        return `/tweet/${this.tweet.id}`
    }
}

export class FollowNotification extends BaseNotificationTemplate implements NotificationTemplate {
    icon = 'user'
    titleSuffix = 'followed you'

    get url(): string {
        return `/${this.users[0].username}`
    }
}

export class MentionNotification extends BaseNotificationTemplate implements NotificationTemplate {
    icon = 'user'
    titleSuffix = 'mentioned you'

    get url(): string {
        return `/tweet/${this.tweet.id}`
    }
}
