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

    constructor(
        private route: ActivatedRoute,
        public auth: AuthService,
        private userService: UserService
    ) { }

    async ngOnInit(): Promise<void> {
        this.followers = await this.userService.followers(this.route.snapshot.params.username)
    }

}
