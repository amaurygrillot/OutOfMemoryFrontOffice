import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from "./error/components/page-not-found/page-not-found.component";
import {AppComponent} from "@app/app.component";
import {LoginComponent} from "@app/auth/login/login.component";

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '',
        component: LoginComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  /*
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })]
   */
  exports: [RouterModule]
})
export class AppRoutingModule { }
