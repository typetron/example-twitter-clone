import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from 'Services'
import { LoginForm } from '@Data/Forms/LoginForm'
import { FormBuilder, isValid } from '../../util'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    form = FormBuilder.build(LoginForm)
    loading = false

    constructor(
        private router: Router,
        private authService: AuthService
    ) {}

    async login(): Promise<void> {
        if (!isValid(this.form)) {
            return
        }
        this.loading = true
        await this.authService.login(this.form.value).catch(() => this.loading = false)
        await this.router.navigate(['/home'])
        this.loading = false
    }
}
