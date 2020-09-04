import { Component, OnInit } from '@angular/core';
import { TweetService } from '../../services/tweet.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    tweets: any[] = [];

    constructor(
        private tweetService: TweetService
    ) { }

    async ngOnInit(): Promise<void> {
        await this.load();
    }

    async load(): Promise<void> {
        this.tweets = await this.tweetService.getTweets();
    }

    async tweeted(tweet: object): Promise<void> {
        this.tweets.unshift(tweet);
    }

}
