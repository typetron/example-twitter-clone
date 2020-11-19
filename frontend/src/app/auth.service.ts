import { Injectable } from '@angular/core'
import { ApiService } from './api.service'
import { HttpClient } from '@angular/common/http'
import { User } from '@Data/Models/User'
import { BehaviorSubject } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class AuthService extends ApiService {

    user$ = new BehaviorSubject<User | undefined>(undefined)

    constructor(http: HttpClient) {
        super(http)
    }

    loadUser(): User | undefined {
        const userJSON = localStorage.getItem('user')
        const user = userJSON ? JSON.parse(userJSON) : undefined
        this.user$.next(user)
        return user
    }

    user(): User | undefined {
        return this.user$.value
    }

    setUser(user: User): void {
        localStorage.setItem('user', JSON.stringify(user))
        this.user$.next(user)
    }

    async login(username: string, password: string): Promise<void> {
        const response = await this.http.post<{token: string, user: User}>(this.getEndpoint('login'), {
            username,
            password
        }).toPromise()

        this.setUser(response.user)
        localStorage.setItem('token', response.token)
    }

    logout(): void {
        localStorage.removeItem('user')
    }
}
