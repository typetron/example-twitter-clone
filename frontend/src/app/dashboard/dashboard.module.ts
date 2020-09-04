import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './pages/home/home.component';
import {
    NzAvatarModule,
    NzBreadCrumbModule,
    NzButtonModule,
    NzDividerModule,
    NzFormModule,
    NzGridModule,
    NzIconModule,
    NzInputModule,
    NzLayoutModule,
    NzMenuModule,
    NzModalModule,
    NzSpinModule,
    NzTabsModule,
    NzTypographyModule,
    NzUploadModule
} from 'ng-zorro-antd';
import { BasePageComponent } from './components/base-page/base-page.component';
import { TweetComponent } from './components/tweet/tweet.component';
import { ExploreComponent } from './pages/explore/explore.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { SpinComponent } from './components/spin/spin.component';
import { NotificationComponent } from './components/notification/notification.component';
import { TweetFormComponent } from './pages/tweet-form/tweet-form.component';
import { TweetsComponent } from './pages/profile/tweets/tweets.component';
import { TweetsAndRepliesComponent } from './pages/profile/tweets-and-replies/tweets-and-replies.component';
import { LikesComponent } from './pages/profile/likes/likes.component';
import { EditFormComponent } from './pages/profile/edit-form/edit-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        HomeComponent,
        BasePageComponent,
        TweetComponent,
        TweetFormComponent,
        ExploreComponent,
        NotificationsComponent,
        ProfileComponent,
        SettingsComponent,
        SpinComponent,
        NotificationComponent,
        TweetsComponent,
        TweetsAndRepliesComponent,
        LikesComponent,
        EditFormComponent
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        NzLayoutModule,
        NzMenuModule,
        NzBreadCrumbModule,
        NzGridModule,
        NzIconModule,
        NzDividerModule,
        NzAvatarModule,
        NzTypographyModule,
        NzSpinModule,
        NzButtonModule,
        NzTabsModule,
        NzFormModule,
        ReactiveFormsModule,
        NzInputModule,
        NzModalModule,
        NzUploadModule,
    ]
})
export class DashboardModule {}
