import { Component, OnDestroy, OnInit, Type } from '@angular/core'
import { NotificationService } from '../../services/notification.service'
import { Notification } from '../../../../../../Models/Notification'
import {
    BaseNotificationTemplate,
    FollowNotification,
    LikeNotification,
    MentionNotification,
    ReplyNotification,
    RetweetNotification
} from '../../services/models'
import { UserService } from '../../user.service'
import { Subject } from 'rxjs'
import { filter, startWith, takeUntil } from 'rxjs/operators'
import { Router } from '@angular/router'

@Component({
    selector: 'app-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit, OnDestroy {

    loading = true

    types: Record<Notification['type'], Type<BaseNotificationTemplate>> = {
        follow: FollowNotification,
        reply: ReplyNotification,
        like: LikeNotification,
        retweet: RetweetNotification,
        mention: MentionNotification,
    }

    notifications: BaseNotificationTemplate[] = []

    private destroy$ = new Subject()

    constructor(
        private notificationService: NotificationService,
        private userService: UserService,
        private router: Router,
    ) { }

    async ngOnInit(): Promise<void> {
        this.loading = true

        this.userService.unreadNotifications$
            .pipe(startWith(1), takeUntil(this.destroy$), filter(value => value > 0))
            .subscribe(async () => {
                await this.load()
            })
    }

    ngOnDestroy(): void {
        this.destroy$.next()
    }

    async redirect(notification: BaseNotificationTemplate): Promise<void> {
        await this.router.navigateByUrl(notification.url)
    }

    private async load(): Promise<void> {
        const notifications = await this.notificationService.list().finally(() => this.loading = false)
        this.notifications = notifications.map(notification => new this.types[notification.type](notification))
        await this.notificationService.read()
        await this.userService.getUnreadNotifications()
    }
}
