import { Component, OnInit } from '@angular/core'
import { TweetService } from '../../services/tweet.service'
import { Tweet } from '@Data/Models/Tweet'
import { AppService } from '../../../app.service'
import { filter } from 'rxjs/operators'

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    page = 1
    tweets: Tweet[] = []
    noMoreTweets = false
    loading = true

    constructor(
        private tweetService: TweetService,
        private appService: AppService,
    ) {}

    async ngOnInit(): Promise<void> {
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

    async load(): Promise<void> {
        if (this.noMoreTweets) {
            return
        }
        this.loading = true
        const tweets = await this.tweetService.getTweets(this.page).finally(() => this.loading = false)
        this.noMoreTweets = !Boolean(tweets.length)
        this.tweets.push(...tweets)
    }

    async tweeted(tweet: Tweet): Promise<void> {
        this.tweets.unshift(tweet)
    }

    async deleteTweet(): Promise<void> {
        await this.load()
    }

}
