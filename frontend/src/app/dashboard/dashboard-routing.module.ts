import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './pages/home/home.component'
import { BasePageComponent } from './components/base-page/base-page.component'
import { ExploreComponent } from './pages/explore/explore.component'
import { NotificationsComponent } from './pages/notifications/notifications.component'
import { SettingsComponent } from './pages/settings/settings.component'
import { ProfileComponent } from './pages/profile/profile.component'
import { FollowingsComponent } from './pages/followings/followings.component'
import { FollowersComponent } from './pages/followers/followers.component'
import { TweetComponent } from './pages/tweet/tweet.component'

const routes: Routes = [
    {
        path: '',
        component: BasePageComponent,
        children: [
            {
                path: '',
                redirectTo: 'home'
            },
            {
                path: 'home',
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
                path: ':username',
                component: ProfileComponent
            },
            {
                path: ':username/following',
                component: FollowingsComponent
            },
            {
                path: ':username/followers',
                component: FollowersComponent
            },
            {
                path: 'tweet/:id',
                component: TweetComponent
            }
        ]
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule {}
