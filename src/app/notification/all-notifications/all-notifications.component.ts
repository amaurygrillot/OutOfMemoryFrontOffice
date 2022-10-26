import {Component, OnInit} from '@angular/core';
import {UserService} from "@app/services/user.service";
import {Notification} from "@app/shared/models";

@Component({
  selector: 'app-all-notifications',
  templateUrl: './all-notifications.component.html',
  styleUrls: ['./all-notifications.component.css']
})
export class AllNotificationsComponent implements OnInit {

  isLoading = true;
  notificationsdb!: Notification[];

  constructor(private _userService: UserService) {
  }

  ngOnInit(): void {
    this.setAllNotifications()
  }

  setAllNotifications() {
    this._userService.getAllNotificationsByUser().subscribe(async (notifications) => {
      this.notificationsdb = notifications;
      this.isLoading = false;
    });
  }

}
