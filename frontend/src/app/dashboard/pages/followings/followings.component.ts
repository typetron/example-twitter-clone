import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { User } from '@Data/Models/User'
import { AuthService, UserService } from 'Services'

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
