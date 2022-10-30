import { Component, OnInit } from '@angular/core';
import {UserComponent} from "@app/user/user.component";
import {User} from "@app/shared/models";
import {AppComponent} from "@app/app.component";
import {ProfileComponent} from "@app/user/profile/profile.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-menu-user',
  templateUrl: './menu-user.component.html',
  styleUrls: ['./menu-user.component.css']
})
export class MenuUserComponent implements OnInit {

  url: string | undefined
  user: User | undefined

  constructor(private _userComponent: UserComponent, private _appComponent: AppComponent, private _dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.user = this._userComponent.user;
    this.url = this._userComponent.URL;
  }

  logOff() {
    this._appComponent.logOff()
  }

  showProfile() {
    this._appComponent.showProfile();
    this._appComponent.tabGroup.selectedIndex = 4;
  }

  showSettings() {
    this._appComponent.showSettings();
    this._appComponent.tabGroup.selectedIndex = 4;
  }

  openProfile() {
    const dialogRef = this._dialog.open(ProfileComponent, {
      width: '800px',
      height: '750px',
      data: {
        'userId': this.user?.uid
      }
    });
    dialogRef.afterClosed().subscribe(result => {});
  }
}
