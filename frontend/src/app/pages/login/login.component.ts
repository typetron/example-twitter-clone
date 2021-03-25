import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { FormBuilder } from 'src/app/util'
import { AuthService } from '../../services/auth.service'
import { LoginForm } from '../../../../../Forms/LoginForm'

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
        this.loading = true
        await this.authService.login(this.form.value).finally(() => this.loading = false)
        this.loading = true
        await this.router.navigate(['/home'])
        this.loading = false
    }
}
