import { Component, OnInit } from '@angular/core'
import { EditFormComponent } from './edit-form/edit-form.component'
import { NzModalService } from 'ng-zorro-antd/modal'
import { environment } from '../../../../environments/environment'
import { ActivatedRoute } from '@angular/router'
import { User } from '@Data/Models/User'
import { TopicsFormComponent } from './topics-form/topics-form.component'
import { AuthService, UserService } from 'Services'
import { isValid } from '../../../util'

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    imgPath = environment.apiUrl
    user?: User
    loading = true

    constructor(
        private modal: NzModalService,
        private userService: UserService,
        public authService: AuthService,
        private route: ActivatedRoute
    ) { }

    async ngOnInit(): Promise<void> {
        this.route.params.subscribe(async (params) => {
            this.user = undefined
            this.loading = true
            await this.load(params.username)
        })
    }

    async load(username: string): Promise<void> {
        this.user = await this.userService.getUser(username).finally(() => this.loading = false)
    }

    showEditModal(): void {
        this.modal.create({
            nzTitle: 'Edit profile',
            nzContent: EditFormComponent,
            nzWidth: 700,
            nzComponentParams: {
                user: this.user
            },
            nzOnOk: async (modal) => {
                if (!isValid(modal.form)) {
                    return false
                }

                try {
                    const user = await this.userService.edit(modal.form.value)
                    this.authService.setUser(this.user = user)
                } catch {
                    return false
                }
            }
        })
    }

    showTopicsModal(user: User): void {
        this.modal.create({
            nzTitle: user.id === this.authService.user()?.id ? 'Edit topics' : 'Topics',
            nzContent: TopicsFormComponent,
            nzComponentParams: {
                user: user.id
            },
            nzOnOk: async (modal) => {
                await this.userService.saveTopics(modal.form.value)
                // this.authService.setUser(user)
            }
        })
    }

    async follow(user: User): Promise<void> {
        await this.userService.follow(user.id)
        await this.load(user.username)
    }

    async unfollow(user: User): Promise<void> {
        await this.userService.unfollow(user.id)
        await this.load(user.username)
    }
}
