import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from "./error/components/page-not-found/page-not-found.component";

const routes: Routes = [
  { path: '', loadChildren:() => import("./auth/auth.module").then(m => m.AuthModule) },
  { path: 'auth', loadChildren:() => import("./auth/auth.module").then(m => m.AuthModule) },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
