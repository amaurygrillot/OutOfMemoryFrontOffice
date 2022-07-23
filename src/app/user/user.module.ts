import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProfileComponent} from "./profile/profile.component";
import {SharedModule} from "../shared/shared.module";
import { MenuUserComponent } from './menu-user/menu-user.component';
import {UserComponent} from "@app/user/user.component";
import {SharedComponent} from "@app/shared/shared.component";
import {UserService} from "@app/services/user.service";
import {PostService} from "@app/services/post.service";



@NgModule({
  declarations: [
    ProfileComponent,
    MenuUserComponent,
    UserComponent
  ],
  exports: [
    MenuUserComponent,
    ProfileComponent,
    UserComponent
  ],
  providers: [
    SharedComponent,
    UserService,
    PostService
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class UserModule { }
