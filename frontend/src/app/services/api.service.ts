import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { environment } from '../../environments/environment'

interface HttpOptions {
    headers?: HttpHeaders | {
        [header: string]: string | string[];
    }
    observe?: 'body'
    params?: HttpParams | {
        [param: string]: string | string[];
    }
    reportProgress?: boolean
    responseType?: 'json'
    withCredentials?: boolean
}

export class ApiService {

    constructor(
        protected http: HttpClient
    ) {}

    getSessionToken(): string | undefined {
        return localStorage.getItem('token') || undefined
    }

    get<T>(path: string, options: HttpOptions = {}): Promise<T> {
        return this.http.get<T>(this.getEndpoint(path), {
            params: options.params,
            headers: this.getHeaders(options.headers)
        }).toPromise()
    }

    post<T>(path: string, data?: object, options?: HttpOptions): Promise<T> {
        return this.http.post<T>(this.getEndpoint(path), data, {
            params: options?.params,
            headers: this.getHeaders(options?.headers || {})
        }).toPromise()
    }

    delete<T>(path: string, headers?: object): Promise<T> {
        return this.http.delete<T>(this.getEndpoint(path), {
            headers: this.getHeaders(headers || {})
        }).toPromise()
    }

    patch<T>(path: string, data?: object, headers?: object): Promise<T> {
        return this.http.patch<T>(this.getEndpoint(path), data, {
            headers: this.getHeaders(headers || {})
        }).toPromise()
    }

    put<T>(path: string, data?: object, headers?: object): Promise<T> {
        return this.http.put<T>(this.getEndpoint(path), data, {
            headers: this.getHeaders(headers || {})
        }).toPromise()
    }

    getEndpoint(path: string): string {
        return `${environment.apiUrl}/${path}`
    }

    getHeaders(headers: object = {}): HttpHeaders {
        return new HttpHeaders({
            ...headers,
            Authorization: `Bearer ${this.getSessionToken()}`
        })
    }
}
