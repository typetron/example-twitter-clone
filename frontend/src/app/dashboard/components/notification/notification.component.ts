import { Component, Input, OnInit } from '@angular/core'
import { environment } from '../../../../environments/environment'
import { BaseNotificationTemplate } from '../../services/models'

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
    @Input() notification!: BaseNotificationTemplate

    imgPath = environment.apiUrl
    color = `rgba(${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, 0.2)`

    constructor() { }

    ngOnInit(): void {
    }

}
