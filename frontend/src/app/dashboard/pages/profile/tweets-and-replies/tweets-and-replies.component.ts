import { Component, OnInit } from '@angular/core'
import { TweetService } from '../../../services/tweet.service'

@Component({
    selector: 'app-tweets-and-replies',
    templateUrl: './tweets-and-replies.component.html',
    styleUrls: ['./tweets-and-replies.component.scss']
})
export class TweetsAndRepliesComponent implements OnInit {

    tweets: any[] = []

    constructor(
        private tweetService: TweetService
    ) { }

    async ngOnInit(): Promise<void> {
        this.tweets = await this.tweetService.getTweets()
    }

}
