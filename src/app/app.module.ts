import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CodeEditorModule} from '@ngstack/code-editor';
import {environment} from '@environments/environment';
import {provideAuth, getAuth} from '@angular/fire/auth';
import {RouterModule} from "@angular/router";
import {SharedModule} from "@app/shared/shared.module";
import {AppRoutingModule} from "@app/app-routing.module";
import {AuthModule} from "@app/auth/auth.module";
import { PostComponent } from './post/post.component';
import { ProfileComponent } from './profile/profile.component';
import {MAT_DATE_FORMATS} from "@angular/material/core";
import {FullCodeEditorComponent} from "@app/code-editor/full-code-editor.component";
import {LoginComponent} from "@app/auth/login/login.component";
import {DatePipe} from "@angular/common";
import {CreatePostComponent} from "@app/post/create-post/create-post.component";

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'MM/DD/YYYY',
  },
  display: {
    dateInput: 'MM/DD/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};

@NgModule({
  declarations: [
    AppComponent,
    FullCodeEditorComponent,
    PostComponent,
    ProfileComponent,
    CreatePostComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    AppRoutingModule,
    CodeEditorModule.forRoot(),
    //provideFirebaseApp(() => initializeApp(environment.firebase)),
    //provideAuth(() => getAuth()),
    AuthModule,
    RouterModule,
  ],
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS},
    DatePipe
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
