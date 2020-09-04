import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor as BaseHttpInterceptor,
    HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

@Injectable()
export class HttpInterceptor implements BaseHttpInterceptor {

    constructor(
        private router: Router,
        private message: NzMessageService,
    ) {}

    intercept(request: HttpRequest<object>, next: HttpHandler): Observable<HttpEvent<any>> {
        request.headers.set('Accept-Type', 'application/json');

        return next.handle(request).pipe(
            catchError((errorResponse: HttpErrorResponse) => {
                console.log('HTTP Error ', errorResponse);
                if (errorResponse.status === 422) {
                    this.handleValidationErrors(errorResponse.error);
                } else {
                    this.message.error(errorResponse.error.message);
                }

                return throwError(errorResponse);
            })
        );
    }

    private handleValidationErrors(error: {message: Record<string, Record<string, string>>}): void {
        Object.keys(error.message).forEach(formFieldKey => {
            const errors = error.message[formFieldKey];
            Object.values(errors).forEach(formError => {
                this.message.error(formError);
            });
        });
    }
}
