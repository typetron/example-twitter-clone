import { Component, OnInit } from '@angular/core'
import { Tweet } from '@Data/Models/Tweet'
import { TweetService } from 'Services'

@Component({
    selector: 'app-tweets-and-replies',
    templateUrl: './tweets-and-replies.component.html',
    styleUrls: ['./tweets-and-replies.component.scss']
})
export class TweetsAndRepliesComponent implements OnInit {

    tweets: Tweet[] = []

    constructor(
        private tweetService: TweetService
    ) { }

    async ngOnInit(): Promise<void> {
        this.tweets = await this.tweetService.getTweets()
    }

}
