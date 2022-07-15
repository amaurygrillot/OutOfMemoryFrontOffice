import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CodeEditorModule} from '@ngstack/code-editor';
import {CodeEditorComponent} from './features/code-editor/code-editor.component';
import {environment} from '@environments/environment';
import {provideAuth, getAuth} from '@angular/fire/auth';
import {TopbarOnlineComponent} from './topbar/topbar-online/topbar-online.component';
import {TopbarOfflineComponent} from './topbar/topbar-offline/topbar-offline.component';
import {RouterModule} from "@angular/router";
import {SharedModule} from "@app/shared/shared.module";
import {AppRoutingModule} from "@app/app-routing.module";
import {AuthModule} from "@app/auth/auth.module";
import {LocalStorageService} from "@app/auth/services/local-storage.service";
import {TokenService} from "@app/auth/services/token.service";
import {TokenInterceptor} from "@app/token-interceptor";
import { PostComponent } from './post/post.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    CodeEditorComponent,
    TopbarOnlineComponent,
    TopbarOfflineComponent,
    PostComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    AppRoutingModule,
    CodeEditorModule.forRoot(),
    //provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    AuthModule,
    RouterModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    TokenService,
    LocalStorageService
  ],
  exports: [
    CodeEditorComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
