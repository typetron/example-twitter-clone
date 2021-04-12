import { Component, Input } from '@angular/core'
import { User } from '@Data/Models/User'
import { environment } from '../../../../environments/environment'

@Component({
    selector: 'app-follower',
    templateUrl: './follower.component.html',
    styleUrls: ['./follower.component.scss']
})
export class FollowerComponent {

    imgPath = environment.apiUrl

    @Input() user!: User
    @Input() authUser!: User
}
