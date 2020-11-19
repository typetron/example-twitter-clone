import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { TweetService } from '../../services/tweet.service'
import { Tweet } from '@Data/Models/Tweet'

@Component({
    selector: 'app-tweet-form',
    templateUrl: './tweet-form.component.html',
    styleUrls: ['./tweet-form.component.scss']
})
export class TweetFormComponent implements OnInit {

    form = this.fb.group({
        content: undefined,
        replyParent: undefined,
        retweetParent: undefined,
        media: [[]],
    })

    media: string[] = []

    loading = false

    @Input() showParent = true
    @Input() replyParent?: Tweet
    @Input() retweetParent?: Tweet
    @Input() placeholder = 'What\'s new?'
    @Output() tweeted = new EventEmitter<Tweet>()

    constructor(
        private fb: FormBuilder,
        private tweetService: TweetService
    ) {}

    ngOnInit(): void {
        this.form.patchValue({
            replyParent: this.replyParent?.id,
            retweetParent: this.retweetParent?.id,
        })
    }

    async tweet(): Promise<void> {
        this.loading = true
        const tweet = await this.tweetService.tweet(this.form.value).finally(() => {
            this.loading = false
        })
        this.tweeted.emit(tweet)
        this.form.reset({
            media: []
        })
        this.media = []
    }

    beforeUpload(): (file: File) => boolean {
        return (file: File) => {
            this.addMedia(file)
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
