import { Component, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from '../../services/auth.service'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loading = false

    form = this.fb.group({
        username: [null, [Validators.required]],
        password: [null, [Validators.required]],
    })

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
    }

    async login(): Promise<void> {
        this.loading = true
        const form = this.form.value
        await this.authService.login(form.username, form.password).finally(() => this.loading = false)
        this.loading = true
        await this.router.navigate(['/home'])
        this.loading = false
    }
}
