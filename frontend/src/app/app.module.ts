import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { HttpInterceptor } from './http.interceptor';
import { NzMessageModule } from 'ng-zorro-antd';

registerLocaleData(en);

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        NzMessageModule,
    ],
    providers: [
        {provide: NZ_I18N, useValue: en_US},
        {
            provide: HTTP_INTERCEPTORS, useClass: HttpInterceptor, multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
