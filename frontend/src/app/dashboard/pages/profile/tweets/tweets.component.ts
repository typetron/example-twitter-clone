import { Component, OnInit } from '@angular/core'
import { TweetService } from '../../../services/tweet.service'

@Component({
    selector: 'app-tweets',
    templateUrl: './tweets.component.html',
    styleUrls: ['./tweets.component.scss']
})
export class TweetsComponent implements OnInit {

    tweets: any[] = []

    constructor(
        private tweetService: TweetService
    ) { }

    async ngOnInit(): Promise<void> {
        this.tweets = await this.tweetService.getTweets()
    }

}
