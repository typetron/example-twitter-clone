import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TweetService } from '../../services/tweet.service';

@Component({
    selector: 'app-tweet-form',
    templateUrl: './tweet-form.component.html',
    styleUrls: ['./tweet-form.component.scss']
})
export class TweetFormComponent implements OnInit {

    form = this.fb.group({
        content: undefined,
    });

    loading = false;

    @Output() tweeted = new EventEmitter<object>();

    constructor(
        private fb: FormBuilder,
        private tweetService: TweetService
    ) {}

    ngOnInit(): void {
    }

    async tweet(): Promise<void> {
        this.loading = true;
        const form = this.form.value;
        const tweet = await this.tweetService.tweet(form.content).finally(() => {
            this.loading = false;
        });
        this.tweeted.emit(tweet);
        this.form.reset();
    }
}
