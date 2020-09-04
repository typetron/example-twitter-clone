import { Component, Input, OnInit } from '@angular/core';
import { Notification } from '../../services/notification.service';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

    @Input() notification!: Notification;

    color = `rgba(${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, 0.2)`;

    constructor() { }

    ngOnInit(): void {
    }

}
