import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { UserService } from '../../user.service'
import { User } from '@Data/Models/User'
import { AuthService } from '../../../auth.service'

@Component({
    selector: 'app-followers',
    templateUrl: './followers.component.html',
    styleUrls: ['./followers.component.scss']
})
export class FollowersComponent implements OnInit {
    followers: User[] = []
    user: User

    constructor(
        private route: ActivatedRoute,
        public auth: AuthService,
        private userService: UserService
    ) { }

    async ngOnInit(): Promise<void> {
        [
            this.user,
            this.followers
        ] = await Promise.all([
            this.userService.getUser(this.route.snapshot.params.username),
            this.userService.followers(this.route.snapshot.params.username)
        ])
    }

}
