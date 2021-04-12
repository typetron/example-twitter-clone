import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n'
import { registerLocaleData } from '@angular/common'
import en from '@angular/common/locales/en'
import { NzMessageModule } from 'ng-zorro-antd/message'
import { HttpInterceptor } from './services/http.interceptor'
import { LoginComponent } from './pages/login/login.component'
import { RegisterComponent } from './pages/register/register.component'
import { NzButtonModule } from 'ng-zorro-antd/button'
import { NzFormModule } from 'ng-zorro-antd/form'
import { ReactiveFormsModule } from '@angular/forms'
import { NzInputModule } from 'ng-zorro-antd/input'
import { AuthComponent } from './layouts/auth/auth.component'
import { SharedModule } from './shared/shared.module'

registerLocaleData(en)

@NgModule({
    declarations: [
        AppComponent,
        AuthComponent,
        LoginComponent,
        RegisterComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        NzMessageModule,
        BrowserAnimationsModule,
        NzButtonModule,
        NzFormModule,
        ReactiveFormsModule,
        NzInputModule,
        SharedModule
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
