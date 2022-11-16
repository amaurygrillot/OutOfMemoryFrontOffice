import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from "@app/shared/shared.module";
import {AuthModule} from "@app/auth/auth.module";
import {MAT_DATE_FORMATS} from "@angular/material/core";
import {UserModule} from "@app/user/user.module";
import {PostModule} from "@app/post/post.module";
import {FullCodeEditorModule} from "@app/code-editor/full-code-editor.module";
import {NotificationModule} from "@app/notification/notification.module";
import { ChallengeComponent } from './challenge/challenge/challenge.component';
import { ChallengeBoardComponent } from './challenge/challenge-board/challenge-board.component';
import { AllChallengesComponent } from './challenge/all-challenges/all-challenges.component';
import {MatTableModule} from "@angular/material/table";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {ErrorModule} from "@app/error/error.module";
import {MatListModule} from "@angular/material/list";

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
        SharedModule,
        AuthModule,
        UserModule,
        PostModule,
        FullCodeEditorModule,
        NotificationModule,
        ErrorModule,
        MatTableModule,
        MatExpansionModule,
        MatSortModule,
        MatPaginatorModule,
        MatListModule
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
