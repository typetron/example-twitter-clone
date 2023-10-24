import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor as BaseHttpInterceptor,
    HttpRequest
} from '@angular/common/http'
import { Injectable } from '@angular/core'
import { catchError, distinctUntilChanged } from 'rxjs/operators'
import { Observable, Subject, throwError } from 'rxjs'
import { Router } from '@angular/router'
import { NzMessageService } from 'ng-zorro-antd/message'
import { AuthService } from './auth.service'

@Injectable()
export class HttpInterceptor implements BaseHttpInterceptor {

    private error$ = new Subject<string>()

    constructor(
        private router: Router,
        private authService: AuthService,
        private message: NzMessageService,
    ) {
        this.error$.pipe(distinctUntilChanged()).subscribe(message => {
            this.message.error(message)
        })
    }

    intercept(request: HttpRequest<object>, next: HttpHandler): Observable<HttpEvent<any>> {
        request.headers.set('Accept-Type', 'application/json')

        return next.handle(request).pipe(
            catchError((errorResponse: HttpErrorResponse) => {
                console.log('HTTP Error ', errorResponse)
                if (errorResponse.status === 401) {
                    this.authService.logout()
                    this.router.navigateByUrl('/login')
                }
                if (errorResponse.status === 422) {
                    this.handleValidationErrors(errorResponse.error)
                } else {
                    this.error$.next(errorResponse.error.message)
                }

                return throwError(errorResponse)
            })
        )
    }

    private handleValidationErrors(error: {message: Record<string, Record<string, string>>}): void {
        Object.keys(error.message).forEach(formFieldKey => {
            const errors = error.message[formFieldKey]
            Object.values(errors).forEach(formError => {
                this.error$.next(formError)
            })
        })
    }
}
