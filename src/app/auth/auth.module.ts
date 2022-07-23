import {NgModule} from '@angular/core';
import {AuthComponent} from './auth.component';
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from './signup/signup.component';
import {SharedModule} from "../shared/shared.module";
import {AuthRoutingModule} from "@app/auth/auth-routing.module";


@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    SignupComponent
  ],
  exports: [
    AuthComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    SharedModule,
    AuthRoutingModule
  ]
})
export class AuthModule {
}
