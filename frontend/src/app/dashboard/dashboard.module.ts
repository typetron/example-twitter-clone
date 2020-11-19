import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { DashboardRoutingModule } from './dashboard-routing.module'
import { HomeComponent } from './pages/home/home.component'
import { TweetComponent as TweetComponentPage } from './pages/tweet/tweet.component'
import { BasePageComponent } from './components/base-page/base-page.component'
import { TweetComponent } from './components/tweet/tweet.component'
import { ExploreComponent } from './pages/explore/explore.component'
import { NotificationsComponent } from './pages/notifications/notifications.component'
import { ProfileComponent } from './pages/profile/profile.component'
import { SettingsComponent } from './pages/settings/settings.component'
import { SpinComponent } from './components/spin/spin.component'
import { NotificationComponent } from './components/notification/notification.component'
import { TweetsComponent } from './pages/profile/tweets/tweets.component'
import { TweetsAndRepliesComponent } from './pages/profile/tweets-and-replies/tweets-and-replies.component'
import { LikesComponent } from './pages/profile/likes/likes.component'
import { EditFormComponent } from './pages/profile/edit-form/edit-form.component'
import { ReactiveFormsModule } from '@angular/forms'
import { NzLayoutModule } from 'ng-zorro-antd/layout'
import { NzMenuModule } from 'ng-zorro-antd/menu'
import { NzFormModule } from 'ng-zorro-antd/form'
import { NzTabsModule } from 'ng-zorro-antd/tabs'
import { NzTypographyModule } from 'ng-zorro-antd/typography'
import { NzButtonModule } from 'ng-zorro-antd/button'
import { NzSpinModule } from 'ng-zorro-antd/spin'
import { NzGridModule } from 'ng-zorro-antd/grid'
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb'
import { NzDividerModule } from 'ng-zorro-antd/divider'
import { NzUploadModule } from 'ng-zorro-antd/upload'
import { NzIconModule } from 'ng-zorro-antd/icon'
import { NzAvatarModule } from 'ng-zorro-antd/avatar'
import { NzModalModule } from 'ng-zorro-antd/modal'
import { NzInputModule } from 'ng-zorro-antd/input'
import { NzDropDownModule } from 'ng-zorro-antd/dropdown'
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm'
import { FollowersComponent } from './pages/followers/followers.component'
import { FollowingsComponent } from './pages/followings/followings.component'
import { TweetFormComponent } from './components/tweet-form/tweet-form.component'
import { TopicsFormComponent } from './pages/profile/topics-form/topics-form.component'
import { NzListModule } from 'ng-zorro-antd/list'
import { NzToolTipModule } from 'ng-zorro-antd/tooltip'
import { NzPipesModule } from 'ng-zorro-antd/pipes'
import { NzCarouselModule } from 'ng-zorro-antd/carousel'
import { NzBadgeModule } from 'ng-zorro-antd/badge'
import { NzCardModule } from 'ng-zorro-antd/card'
import { FollowerComponent } from './components/follower/follower.component'

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
        EditFormComponent,
        FollowersComponent,
        FollowingsComponent,
        TweetComponentPage,
        TopicsFormComponent,
        FollowerComponent
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
        NzDropDownModule,
        NzPopconfirmModule,
        NzListModule,
        NzToolTipModule,
        NzPipesModule,
        NzCarouselModule,
        NzBadgeModule,
        NzCardModule,
    ]
})
export class DashboardModule {}
