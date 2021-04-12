import { Component, OnInit } from '@angular/core'
import { Tweet } from '@Data/Models/Tweet'
import { TweetService } from 'Services'

@Component({
    selector: 'app-likes',
    templateUrl: './likes.component.html',
    styleUrls: ['./likes.component.scss']
})
export class LikesComponent implements OnInit {

    tweets: Tweet[] = []

    constructor(
        private tweetService: TweetService
    ) { }

    async ngOnInit(): Promise<void> {
        this.tweets = await this.tweetService.getTweets()
    }

}
