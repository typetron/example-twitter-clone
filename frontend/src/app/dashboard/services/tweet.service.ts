import { Injectable } from '@angular/core'
import { ApiService } from '../../api.service'
import { HttpClient } from '@angular/common/http'
import { Tweet } from '@Data/Models/Tweet'
import { toFormData } from '../../util'

@Injectable({
    providedIn: 'root'
})
export class TweetService extends ApiService {

    constructor(http: HttpClient) {
        super(http)
    }

    getTweet(id: number): Promise<Tweet> {
        return this.get(`tweet/${id}`)
    }

    getTweets(page = 1): Promise<Tweet[]> {
        return this.get(`?page=${page}`)
    }

    tweet(form: object): Promise<Tweet> {
        return this.post<Tweet>('tweet', toFormData(form))
    }

    remove(id: number): Promise<Tweet> {
        return super.delete<Tweet>(`tweet/${id}`)
    }

    toggleLike(id: number): Promise<Tweet> {
        return super.post<Tweet>(`tweet/${id}/like`)
    }

    replies(id: number): Promise<Tweet[]> {
        return super.get<Tweet[]>(`tweet/${id}/replies`)
    }

    retweet(id: number): Promise<Tweet> {
        return super.post<Tweet>(`tweet/${id}/retweet`)
    }
}
