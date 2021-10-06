import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
// import { FormBuilder } from '@angular/forms'
import { Tweet } from '@Data/Models/Tweet'
import { TweetService } from 'Services'
import { TweetForm } from '@Data/Forms/TweetForm'
import { FormBuilder } from '@typetron/angular'
import { isValid } from '../../../util'
import { NzUploadFile } from 'ng-zorro-antd/upload'

@Component({
    selector: 'app-tweet-form',
    templateUrl: './tweet-form.component.html',
    styleUrls: ['./tweet-form.component.scss']
})
export class TweetFormComponent implements OnInit {

    form = FormBuilder.build(TweetForm)

    media: string[] = []

    loading = false

    @Input() showParent = true
    @Input() replyParent?: Tweet
    @Input() retweetParent?: Tweet
    @Input() placeholder = `What's new?`
    @Output() tweeted = new EventEmitter<Tweet>()

    constructor(
        private tweetService: TweetService
    ) {}

    ngOnInit(): void {
    }

    async tweet(): Promise<void> {
        if (!isValid(this.form)) {
            return
        }

        this.loading = true
        let tweet: Tweet
        if (this.replyParent) {
            tweet = await this.tweetService.reply(this.replyParent.id, this.form.value).finally(() => {this.loading = false})
        } else if (this.retweetParent) {
            tweet = await this.tweetService.retweet(this.retweetParent.id, this.form.value).finally(() => {this.loading = false})
        } else {
            tweet = await this.tweetService.tweet(this.form.value).finally(() => {this.loading = false})
        }
        this.tweeted.emit(tweet)
        this.media = []
        this.form.reset()
    }

    beforeUpload(): (file: NzUploadFile) => boolean {
        return (file: NzUploadFile) => {
            this.addMedia(file as unknown as File)
            return false
        }
    }

    addMedia(media: File): void {
        this.form.controls.media.value.push(media)
        const fileURL = URL.createObjectURL(media)
        this.media.push(fileURL)
    }

    removeMedia(index: number): void {
        this.form.controls.media.value.remove(this.form.controls.media.value[index])
        this.media.remove(this.media[index])
    }
}
