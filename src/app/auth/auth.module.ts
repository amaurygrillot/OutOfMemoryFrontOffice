import {NgModule} from '@angular/core';
import {AuthComponent} from './auth.component';
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from './signup/signup.component';
import {SharedModule} from "../shared/shared.module";


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
    SharedModule
  ]
})
export class AuthModule {
}
