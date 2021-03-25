import { Injectable } from '@angular/core'
import { ApiService } from './api.service'
import { HttpClient } from '@angular/common/http'
import { User } from '@Data/Models/User'
import { BehaviorSubject } from 'rxjs'
import { LoginForm } from '../../../../Forms/LoginForm'

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

    async login(form: LoginForm): Promise<void> {
        const response = await this.http.post<{token: string, user: User}>(this.getEndpoint('login'), form).toPromise()

        this.setUser(response.user)
        localStorage.setItem('token', response.token)
    }

    register(form: object): Promise<User> {
        return this.http.post<User>(this.getEndpoint('register'), form).toPromise()
    }

    logout(): void {
        localStorage.removeItem('user')
    }
}
