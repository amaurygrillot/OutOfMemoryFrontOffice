import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from "@angular/router";
import {SharedModule} from "@app/shared/shared.module";
import {AppRoutingModule} from "@app/app-routing.module";
import {AuthModule} from "@app/auth/auth.module";
import {MAT_DATE_FORMATS} from "@angular/material/core";
import {UserModule} from "@app/user/user.module";
import {PostModule} from "@app/post/post.module";
import {FullCodeEditorModule} from "@app/code-editor/full-code-editor.module";
import { ChallengeComponent } from './challenge/challenge/challenge.component';
import { ChallengeBoardComponent } from './challenge/challenge-board/challenge-board.component';
import { AllChallengesComponent } from './challenge/all-challenges/all-challenges.component';
import {MatTableModule} from "@angular/material/table";
import {MatExpansionModule} from "@angular/material/expansion";

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
    ChallengeComponent,
    ChallengeBoardComponent,
    AllChallengesComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        SharedModule,
        AuthModule,
        RouterModule,
        UserModule,
        PostModule,
        FullCodeEditorModule,
        MatTableModule,
        MatExpansionModule
    ],
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS}
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
