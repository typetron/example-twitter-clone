import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router'
import { AuthService } from './auth.service'

@Injectable({
    providedIn: 'root'
})
export class HomeGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {}

    async canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Promise<boolean> {
        const loggedIn = Boolean(this.authService.loadUser())

        if (loggedIn) {
            await this.router.navigate(['/home'])
            return false
        }
        return true
    }

}
