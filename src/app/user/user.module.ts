import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserComponent} from "./user.component";
import {ProfileComponent} from "./profile/profile.component";
import {SharedModule} from "../shared/shared.module";
import {PostService} from "@app/services/post.service";
import {UserService} from "@app/services/user.service";
import { MenuUserComponent } from './menu-user/menu-user.component';
import {MatDividerModule} from "@angular/material/divider";



@NgModule({
  declarations: [
    UserComponent,
    ProfileComponent,
    MenuUserComponent
  ],
  exports: [
    UserComponent,
    ProfileComponent,
    MenuUserComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [
    PostService,
    UserService
  ]
})
export class UserModule { }
