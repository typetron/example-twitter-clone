import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from 'Services'
import { LoginForm } from '@Data/Forms/LoginForm'
import { FormBuilder } from '@typetron/angular'
import { isValid } from '../../util'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    loading = false

    form = FormBuilder.build(LoginForm)

    constructor(
        private router: Router,
        private authService: AuthService
    ) {}

    async login(): Promise<void> {
        if (!isValid(this.form)) {
            return
        }
        this.loading = true
        await this.authService.login(this.form.value).finally(() => this.loading = false)
        this.loading = true
        await this.router.navigate(['/home'])
        this.loading = false
    }
}
