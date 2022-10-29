import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserComponent} from "./user.component";
import {ProfileComponent} from "./profile/profile.component";
import {SharedModule} from "../shared/shared.module";
import {PostService} from "@app/services/post.service";
import {UserService} from "@app/services/user.service";
import {MenuUserComponent} from './menu-user/menu-user.component';
import {MatDividerModule} from "@angular/material/divider";
import {PostModule} from "@app/post/post.module";
import { AllFollowingComponent } from './all-following/all-following.component';
import { AllFollowersComponent } from './all-followers/all-followers.component';
import { FollowerComponent } from './all-followers/follower/follower.component';
import { FollowingComponent } from './all-following/following/following.component';

@NgModule({
  declarations: [
    UserComponent,
    ProfileComponent,
    MenuUserComponent,
    AllFollowingComponent,
    AllFollowersComponent,
    FollowerComponent,
    FollowingComponent
  ],
  exports: [
    UserComponent,
    ProfileComponent,
    MenuUserComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PostModule
  ],
  providers: [
    PostService,
    UserService
  ]
})
export class UserModule {
}
