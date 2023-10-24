import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from 'Services'
import { RegisterForm } from '@Data/Forms/RegisterForm'
import { FormBuilder, isValid } from '../../util'

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

    form = FormBuilder.build(RegisterForm)
    loading = false

    constructor(
        private router: Router,
        private authService: AuthService
    ) {}

    async register(): Promise<void> {
        if (!isValid(this.form)) {
            return
        }

        this.loading = true
        await this.authService.register(this.form.value).finally(() => this.loading = false)
        this.loading = true
        await this.router.navigate(['/home'])
        this.loading = false
    }
}
