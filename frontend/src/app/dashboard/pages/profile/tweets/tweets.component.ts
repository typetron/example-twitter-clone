import { Component, Input, OnInit } from '@angular/core'
import { TweetService } from '../../../services/tweet.service'
import { Tweet } from '@Data/Models/Tweet'
import { filter } from 'rxjs/operators'
import { AppService } from '../../../../services/app.service'
import { Subject } from 'rxjs'
import { UserService } from '../../../user.service'

@Component({
    selector: 'app-tweets',
    templateUrl: './tweets.component.html',
    styleUrls: ['./tweets.component.scss']
})
export class TweetsComponent implements OnInit {

    @Input()
    username?: string

    @Input()
    explore = false

    @Input()
    update$ = new Subject()

    tweets: Tweet[] = []
    page = 1
    noMoreTweets = false
    loading = true

    constructor(
        private tweetService: TweetService,
        private userService: UserService,
        private appService: AppService,
    ) { }

    async ngOnInit(): Promise<void> {
        this.update$.subscribe(async () => {
            this.reset()
            await this.load()
        })
        await this.load()

        this.appService.scroll$.pipe(
            filter(event => {
                const target = event.target as HTMLElement
                return !this.loading && target.scrollTop >= target.scrollHeight - target.clientHeight - 100
            })
        ).subscribe(async () => {
            this.page++
            await this.load()
        })
    }

    reset(): void {
        this.page = 1
        this.noMoreTweets = false
        this.tweets = []
    }

    async load(): Promise<void> {
        if (this.noMoreTweets) {
            return
        }
        this.loading = true
        let tweets: Tweet[]
        if (this.explore) {
            tweets = await this.userService.explore(this.page).finally(() => this.loading = false)
        } else {
            if (this.username) {
                tweets = await this.userService.getTweets(this.page, this.username).finally(() => this.loading = false)
            } else {
                tweets = await this.tweetService.getTweets(this.page).finally(() => this.loading = false)
            }
        }
        this.noMoreTweets = !Boolean(tweets.length)
        this.tweets.push(...tweets)
    }
}
