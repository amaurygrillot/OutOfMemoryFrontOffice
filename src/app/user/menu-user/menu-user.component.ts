import { Component, OnInit } from '@angular/core';
import {UserComponent} from "@app/user/user.component";
import {User} from "@app/shared/models";
import {AppComponent} from "@app/app.component";

@Component({
  selector: 'app-menu-user',
  templateUrl: './menu-user.component.html',
  styleUrls: ['./menu-user.component.css']
})
export class MenuUserComponent implements OnInit {

  url: string | undefined
  user: User | undefined

  constructor(private userComponent: UserComponent, private appComponent: AppComponent) {
  }

  ngOnInit(): void {
    this.user = this.userComponent.user;
    this.url = this.userComponent.URL;
  }

  logOff() {
    this.appComponent.logOff()
  }

  showProfile() {
    this.appComponent.showProfile();
    this.appComponent.tabGroup.selectedIndex = 4;
  }

  showSettings() {
    this.appComponent.showSettings();
    this.appComponent.tabGroup.selectedIndex = 4;
  }
}
