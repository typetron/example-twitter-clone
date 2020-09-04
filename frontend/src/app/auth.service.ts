import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AuthService extends ApiService {

    constructor(http: HttpClient) {
        super(http);
    }

    user(): string | undefined {
        return localStorage.getItem('user') || undefined;
    }

    async login(username: string, password: string): Promise<any> {
        const response = await this.http.post<{token: string, user: any}>(this.getEndpoint('login'), {
            username,
            password
        }).toPromise();

        localStorage.setItem('user', response.user);
        localStorage.setItem('token', response.token);
        // return new Promise(resolve => {
        //     setTimeout(() => {
        //         localStorage.setItem('user', user);
        //         resolve();
        //     }, 500);
        // });
    }

    logout(): void {
        localStorage.removeItem('user');
    }
}
