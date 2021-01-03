import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { User } from '@Data/Models/User'
import { toFormData } from '../util'
import { Topic } from '@Data/Models/Topic'
import { TopicsForm } from '../../../../Forms/TopicsForm'
import { BehaviorSubject } from 'rxjs'
import { ApiService } from '../services/api.service'
import { Tweet } from '../../../../Models/Tweet'

@Injectable({
    providedIn: 'root'
})
export class UserService extends ApiService {

    unreadNotifications$ = new BehaviorSubject<number>(0)

    constructor(http: HttpClient) {
        super(http)
    }

    async edit(form: object): Promise<User> {
        return this.patch<User>('user', toFormData(form))
    }

    async getUser(username: string): Promise<User> {
        return this.get<User>(`users/${username}`)
    }

    async followers(username: string): Promise<User[]> {
        return this.get<User[]>(`users/${username}/followers`)
    }

    async following(username: string): Promise<User[]> {
        return this.get<User[]>(`users/${username}/following`)
    }

    async follow(id: number): Promise<User> {
        return this.post<User>(`users/follow/${id}`)
    }

    async unfollow(id: number): Promise<User> {
        return this.post<User>(`users/unfollow/${id}`)
    }

    async allTopics(): Promise<Topic[]> {
        return this.get<Topic[]>(`topics`)
    }

    async topics(): Promise<Topic[]> {
        return this.get<Topic[]>(`users/topics`)
    }

    async saveTopics(form: TopicsForm): Promise<User> {
        return this.post<User>(`users/topics`, form)
    }

    async getUnreadNotifications(): Promise<void> {
        this.unreadNotifications$.next(await this.get('notifications/unread'))
    }

    explore(page = 1): Promise<Tweet[]> {
        return this.get(`explore`, {
            params: {
                page: page.toString(),
            }
        })
    }

    getTweets(page = 1, username: string): Promise<Tweet[]> {
        const params: Record<string, string> = {
            page: page.toString(),
        }
        if (username) {
            params.username = username
        }
        return this.get(`${username}/tweets`, {params})
    }
}
