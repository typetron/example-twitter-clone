import { Injectable } from '@angular/core';
import { ApiService } from '../../api.service';
import { HttpClient } from '@angular/common/http';
import { Tweet } from '@Data/Models/Tweet';

@Injectable({
    providedIn: 'root'
})
export class TweetService extends ApiService {

    constructor(http: HttpClient) {
        super(http);
    }

    async getTweets(): Promise<any[]> {
        return this.get('');
    }

    async tweet(content: string): Promise<Tweet> {
        return this.post<Tweet>('tweet', {content});
    }
}
