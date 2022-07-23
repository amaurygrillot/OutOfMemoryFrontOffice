import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserComponent} from "./user.component";
import {ProfileComponent} from "./profile/profile.component";
import {SharedModule} from "../shared/shared.module";



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
  ]
})
export class UserModule { }
