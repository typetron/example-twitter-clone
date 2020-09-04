import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loading = false;

    form = this.fb.group({
        username: [null, [Validators.required]],
        password: [null, [Validators.required]],
    });

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
    }

    async login(): Promise<void> {
        this.loading = true;
        const form = this.form.value;
        await this.authService.login(form.username, form.password);
        await this.router.navigate(['']);
        this.loading = false;
    }
}
