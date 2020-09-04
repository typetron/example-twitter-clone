import { Component, OnInit } from '@angular/core';
import { TweetService } from '../../services/tweet.service';

@Component({
    selector: 'app-explore',
    templateUrl: './explore.component.html',
    styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {

    tweets: any[] = [];

    constructor(
        private tweetService: TweetService
    ) { }

    async ngOnInit(): Promise<void> {
        this.tweets = await this.tweetService.getTweets();
    }

}
