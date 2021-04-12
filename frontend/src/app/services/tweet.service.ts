import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Tweet } from '@Data/Models/Tweet'
import { ApiService } from './api.service'
import { toFormData } from '../util'
import { TweetForm } from '@Data/Forms/TweetForm'

@Injectable({
    providedIn: 'root'
})
export class TweetService extends ApiService {

    constructor(http: HttpClient) {
        super(http)
    }

    getTweet(id: number): Promise<Tweet> {
        return this.get(`tweets/${id}`)
    }

    getTweets(page = 1): Promise<Tweet[]> {
        return this.get(``, {
            params: {
                page: page.toString(),
            }
        })
    }

    tweet(form: TweetForm): Promise<Tweet> {
        return this.post<Tweet>('tweets', toFormData(form))
    }

    reply(parent: number, form: TweetForm): Promise<Tweet> {
        return this.post<Tweet>(`tweets/${parent}/reply`, toFormData(form))
    }

    retweet(parent: number, form: TweetForm): Promise<Tweet> {
        return this.post<Tweet>(`tweets/${parent}/retweet`, toFormData(form))
    }

    remove(id: number): Promise<Tweet> {
        return super.delete<Tweet>(`tweets/${id}`)
    }

    toggleLike(id: number): Promise<Tweet> {
        return super.post<Tweet>(`tweets/${id}/like`)
    }

    replies(id: number): Promise<Tweet[]> {
        return super.get<Tweet[]>(`tweets/${id}/replies`)
    }
}
