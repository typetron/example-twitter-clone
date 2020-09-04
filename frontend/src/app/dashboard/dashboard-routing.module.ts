import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BasePageComponent } from './components/base-page/base-page.component';
import { ExploreComponent } from './pages/explore/explore.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
    {
        path: '',
        component: BasePageComponent,
        children: [
            {
                path: '',
                component: HomeComponent
            },
            {
                path: 'explore',
                component: ExploreComponent
            },
            {
                path: 'notifications',
                component: NotificationsComponent
            },
            {
                path: 'settings',
                component: SettingsComponent
            },
            {
                path: 'profile',
                component: ProfileComponent
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule {}
