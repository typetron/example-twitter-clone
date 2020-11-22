import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core'
import { Tweet } from '@Data/Models/Tweet'
import { TweetService } from '../../services/tweet.service'
import { NzMessageService } from 'ng-zorro-antd/message'
import { environment } from '../../../../environments/environment'
import { AuthService } from '../../../auth.service'
import { NzModalService } from 'ng-zorro-antd/modal'
import { TweetFormComponent } from '../tweet-form/tweet-form.component'

@Component({
    selector: 'app-tweet',
    templateUrl: './tweet.component.html',
    styleUrls: ['./tweet.component.scss']
})
export class TweetComponent implements OnInit, OnChanges {
    imgPath = environment.apiUrl

    @Input() tweet!: Tweet
    @Input() showReplyForm = false
    @Input() footer = true
    @Output() delete = new EventEmitter<void>()
    @Output() tweeted = new EventEmitter<Tweet>()

    color = `rgba(${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, 0.2)`

    replies: Tweet[] = []

    constructor(
        private tweetService: TweetService,
        private message: NzMessageService,
        public auth: AuthService,
        private modal: NzModalService,
    ) {
    }

    get likedByCurrentUser(): boolean {
        return !!this.tweet.likes.find(item => item.user.id === this.auth.user()?.id)
    }

    async ngOnInit(): Promise<void> {

    }

    async remove(): Promise<void> {
        await this.tweetService.remove(this.tweet.id)
        this.message.success('Tweet deleted')
        this.delete.emit()
    }

    async toggleLike(): Promise<void> {
        const tweet = await this.tweetService.toggleLike(this.tweet.id)
        Object.assign(this.tweet, tweet)
    }

    async retweet(): Promise<void> {
        const modal = this.modal.create({
            nzTitle: 'Retweet',
            nzContent: TweetFormComponent,
            nzComponentParams: {
                retweetParent: {
                    ...this.tweet,
                    replyParent: undefined,
                    retweetParent: undefined,
                },
                placeholder: 'Retweet comment'
            },
            nzFooter: null
        })
        modal.componentInstance?.tweeted.subscribe(tweet => {
            this.modal.closeAll()
            this.tweeted.emit(tweet)
        })
    }

    async reply(): Promise<void> {
        const modal = this.modal.create({
            nzTitle: 'Reply',
            nzContent: TweetFormComponent,
            nzComponentParams: {
                replyParent: {
                    ...this.tweet,
                    replyParent: undefined,
                    retweetParent: undefined,
                },
                placeholder: 'Write your reply'
            },
            nzFooter: null,
        })

        modal.componentInstance?.tweeted.subscribe(tweet => {
            this.modal.closeAll()
            this.tweeted.emit(tweet)
        })
    }

    async ngOnChanges(changes: SimpleChanges): Promise<void> {
        this.tweet = changes.tweet.currentValue
        await this.load()
    }

    async load(): Promise<void> {
        if (this.showReplyForm) {
            this.replies = await this.tweetService.replies(this.tweet.id)
        }
    }
}
