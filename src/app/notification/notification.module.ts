import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification.component';
import {SharedModule} from "../shared/shared.module";
import { AllNotificationsComponent } from './all-notifications/all-notifications.component';



@NgModule({
  declarations: [
    NotificationComponent,
    AllNotificationsComponent
  ],
  exports: [
    AllNotificationsComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class NotificationModule { }
