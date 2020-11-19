import { Component, OnDestroy, OnInit } from '@angular/core'
import { AuthService } from '../../../auth.service'
import { Router } from '@angular/router'
import { AppService } from '../../../app.service'
import { UserService } from '../../user.service'
import { interval, Subject } from 'rxjs'
import { startWith, takeUntil } from 'rxjs/operators'
import { Topic } from '../../../../../../Models/Topic'

@Component({
    selector: 'app-base-page',
    templateUrl: './base-page.component.html',
    styleUrls: ['./base-page.component.scss']
})
export class BasePageComponent implements OnInit, OnDestroy {
    topics: Topic[] = []
    private destroy$ = new Subject()

    constructor(
        public authService: AuthService,
        public appService: AppService,
        public userService: UserService,
        private router: Router,
    ) { }

    async ngOnInit(): Promise<void> {

        interval(10000).pipe(
            startWith(0),
            takeUntil(this.destroy$),
        ).subscribe(async () => {
            await this.userService.getUnreadNotifications()
        })
        this.topics = await this.userService.allTopics()
    }

    async logout(): Promise<void> {
        this.authService.logout()
        await this.router.navigate(['login'])
    }

    addScrollEvent($event: Event): void {
        this.appService.scroll$.next($event)
    }

    ngOnDestroy(): void {
        this.destroy$.next()
    }
}
