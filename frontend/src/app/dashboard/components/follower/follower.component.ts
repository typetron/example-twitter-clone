import { Component, Input, OnInit } from '@angular/core'
import { User } from '../../../../../../Models/User'
import { environment } from '../../../../environments/environment'

@Component({
    selector: 'app-follower',
    templateUrl: './follower.component.html',
    styleUrls: ['./follower.component.scss']
})
export class FollowerComponent implements OnInit {

    imgPath = environment.apiUrl

    @Input() user!: User
    @Input() authUser?: User

    constructor() { }

    ngOnInit(): void {
    }

}
