import { Component, OnInit } from '@angular/core'
import { User } from '../../../../../../Models/User'
import { ActivatedRoute } from '@angular/router'
import { UserService } from '../../user.service'
import { AuthService } from '../../../services/auth.service'

@Component({
    selector: 'app-followings',
    templateUrl: './followings.component.html',
    styleUrls: ['./followings.component.scss']
})
export class FollowingsComponent implements OnInit {
    following: User[] = []
    user?: User

    constructor(
        private route: ActivatedRoute,
        public auth: AuthService,
        private userService: UserService
    ) { }

    async ngOnInit(): Promise<void> {
        [
            this.user,
            this.following
        ] = await Promise.all([
            this.userService.getUser(this.route.snapshot.params.username),
            this.userService.following(this.route.snapshot.params.username)
        ])
    }
}
