import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-base-page',
    templateUrl: './base-page.component.html',
    styleUrls: ['./base-page.component.scss']
})
export class BasePageComponent implements OnInit {

    constructor(
        private authService: AuthService,
        private router: Router,
    ) { }

    ngOnInit(): void {
    }

    async logout(): Promise<void> {
        this.authService.logout();
        await this.router.navigate(['login']);
    }
}
