import { Component, OnInit } from '@angular/core'
import { environment } from '../../../../environments/environment'
import { NzModalService } from 'ng-zorro-antd/modal'
import { ActivatedRoute } from '@angular/router'
import { Tweet } from '@Data/Models/Tweet'
import { TweetService } from '../../services/tweet.service'

@Component({
    selector: 'app-tweet-page',
    templateUrl: './tweet.component.html',
    styleUrls: ['./tweet.component.scss']
})
export class TweetComponent implements OnInit {
    tweet?: Tweet
    imgPath = environment.apiUrl
    loading = true

    constructor(
        private modal: NzModalService,
        private tweetService: TweetService,
        private route: ActivatedRoute
    ) { }

    async ngOnInit(): Promise<void> {
        this.route.params.subscribe(async (params) => {
            this.loading = true
            await this.load(params.id)
        })
    }

    async load(id: number): Promise<void> {
        this.tweet = await this.tweetService.getTweet(id).finally(() => this.loading = false)
    }
}
