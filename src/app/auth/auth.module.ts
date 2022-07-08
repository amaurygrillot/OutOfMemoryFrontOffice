import {NgModule} from '@angular/core';
import {AuthComponent} from './auth.component';
import {LoginComponent} from "./components/login/login.component";
import {SignupComponent} from './components/signup/signup.component';
import {SharedModule} from "../shared/shared.module";
import {AuthRoutingModule} from "@app/auth/auth-routing.module";
import { LogoutComponent } from './components/logout/logout.component';


@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    SignupComponent,
    LogoutComponent
  ],
  exports: [
    AuthComponent
  ],
  imports: [
    SharedModule,
    AuthRoutingModule
  ]
})
export class AuthModule {
}
