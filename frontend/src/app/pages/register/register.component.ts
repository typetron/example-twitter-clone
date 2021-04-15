import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from 'Services'
import { FormBuilder } from '@typetron/angular'
import { RegisterForm } from '@Data/Forms/RegisterForm'
import { isValid } from '../../util'

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    form = FormBuilder.build(RegisterForm)
    loading = false

    constructor(
        private router: Router,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        console.log('form', this.form)
    }

    async register(): Promise<void> {

        if (!isValid(this.form)) {
            return
        }

        this.loading = true
        await this.authService.register(this.form.value).catch(() => this.loading = false)
        await this.router.navigate(['/home'])
        this.loading = false
    }
}
