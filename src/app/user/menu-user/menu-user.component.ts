import {Component, Input, OnInit} from '@angular/core';
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

  @Input() lastIndex!: number

  url: string | undefined
  user: User | undefined

  constructor(private _userComponent: UserComponent, private _appComponent: AppComponent, private _dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.user = this._userComponent.user;
    this.url = this._userComponent.URL;
    console.log(this.lastIndex)
  }

  logOff() {
    this._appComponent.logOff()
  }

  openProfile() {
    this._appComponent.tabGroup.selectedIndex = 4;
    const dialogRef = this._dialog.open(ProfileComponent, {
      width: '800px',
      height: '750px',
      data: {
        'userId': this.user?.uid
      }
    });
    console.log(this.lastIndex)
    dialogRef.afterClosed().subscribe(_ => {
      console.log(this.lastIndex)
      this._appComponent.tabGroup.selectedIndex = this.lastIndex;
    });
  }
}
