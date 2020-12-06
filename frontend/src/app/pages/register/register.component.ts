import { Component, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from '../../services/auth.service'

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    loading = false

    form = this.fb.group({
        email: [null, [Validators.required]],
        username: [null, [Validators.required]],
        password: [null, [Validators.required]],
        passwordConfirmation: [null, [Validators.required]],
    })

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
    }

    async register(): Promise<void> {
        this.loading = true
        const form = this.form.value
        await this.authService.register(form).finally(() => this.loading = false)
        await this.router.navigate(['/home'])
    }
}
