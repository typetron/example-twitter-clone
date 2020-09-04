import { Component, OnInit } from '@angular/core';
import { Notification, NotificationService } from '../../services/notification.service';

@Component({
    selector: 'app-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

    notifications: Notification[] = [];

    constructor(
        private notificationService: NotificationService
    ) { }

    async ngOnInit(): Promise<void> {
        this.notifications = await this.notificationService.getNotifications();
    }
}
