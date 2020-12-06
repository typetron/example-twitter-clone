import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuard } from './services/auth.guard'
import { LoginComponent } from './pages/login/login.component'
import { RegisterComponent } from './pages/register/register.component'
import { AuthComponent } from './layouts/auth/auth.component'
import { HomeGuard } from './services/home.guard'

const routes: Routes = [
    {
        path: '',
        component: AuthComponent,
        canActivate: [HomeGuard],
        children: [
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'register',
                component: RegisterComponent
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'login',
            },
        ]
    },
    {
        path: '',
        canActivate: [AuthGuard],
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    }
    // {
    //     path: '**',
    //     pathMatch: 'full',
    //     redirectTo: '/home',
    // },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
