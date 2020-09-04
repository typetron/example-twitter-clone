import { Component, OnInit } from '@angular/core';
import { TweetService } from '../../../services/tweet.service';

@Component({
    selector: 'app-likes',
    templateUrl: './likes.component.html',
    styleUrls: ['./likes.component.scss']
})
export class LikesComponent implements OnInit {

    tweets: any[] = [];

    constructor(
        private tweetService: TweetService
    ) { }

    async ngOnInit(): Promise<void> {
        this.tweets = await this.tweetService.getTweets();
    }

}
