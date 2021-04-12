import { Component, Input } from '@angular/core'
import { environment } from '../../../../environments/environment'
import { BaseNotificationTemplate } from '../../models'

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
    @Input() notification!: BaseNotificationTemplate

    imgPath = environment.apiUrl
    color = `rgba(${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, 0.2)`
}
