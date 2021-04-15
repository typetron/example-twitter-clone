import { Component, Input } from '@angular/core'
import { User } from '@Data/Models/User'
import { environment } from '../../../../environments/environment'
import { BaseNotificationTemplate } from '../../models'
import { Router } from '@angular/router'

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
    @Input() notification!: BaseNotificationTemplate

    imgPath = environment.apiUrl
    color = `rgba(${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, 0.2)`

    constructor(private router: Router) {}

    async goToUser(user: User): Promise<void> {
        await this.router.navigate(['/', user.username])
    }
}
