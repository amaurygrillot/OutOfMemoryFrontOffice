import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserComponent} from "./user.component";
import {ProfileComponent} from "./profile/profile.component";
import {SharedModule} from "../shared/shared.module";
import {PostService} from "@app/services/post.service";
import {UserService} from "@app/services/user.service";



@NgModule({
  declarations: [
    UserComponent,
    ProfileComponent
  ],
  exports: [
    UserComponent,
    ProfileComponent
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
