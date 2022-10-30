import {Component, OnInit, ViewChild} from '@angular/core';
import {LoginComponent} from "@app/auth/login/login.component";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "@app/shared/models";
import {MatTabChangeEvent, MatTabGroup} from "@angular/material/tabs";
import {MatDialog} from "@angular/material/dialog";
import {environment} from "@environments/environment";
import {UserService} from "@app/services/user.service";
import {SharedComponent} from "@app/shared/shared.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'OutOfMemoryFrontOffice';
  isLogged = sessionStorage.getItem('token') !== null;
  private _url = environment.apiUrl;

  displayMenuUser = false
  showMenuUser = false
  showPostCreated = true
  showSignup = false
  static sharedComponent: SharedComponent;
  currentUser!: User
  postUser!: User

  @ViewChild('tabGroup') tabGroup!: MatTabGroup;

  constructor(private http: HttpClient, public dialog: MatDialog, private _userService: UserService, private _sharedComponent: SharedComponent) {
    //console.log(sessionStorage);
    this._userService.getUserById(sessionStorage.getItem('userId')!).subscribe(user => {
      this.currentUser = user;
    });
    AppComponent.sharedComponent = _sharedComponent;
    //console.log(this.currentUser);
  }

  ngOnInit(): void {

  }
  updateLoginStatus($event: boolean) {
    this.isLogged = $event;
  }

  async showLogin(): Promise<User | null> {
    const dialogRef = this.dialog.open(LoginComponent, {});
    dialogRef.afterClosed().subscribe(async result => {
      if (sessionStorage.getItem('token') !== null) {
        const header = new HttpHeaders()
          .set('Authorization', `${sessionStorage.getItem('token')}`)
          .set('Content-Type', 'application/json');
        this.isLogged = true;
        this.displayMenuUser = true;

        const user = await this.http.get<any>(`${this._url}/user/getAnotherUserById/${sessionStorage.getItem('userId')}`,
          {headers: header})
          .toPromise();

        this.tabGroup.selectedIndex = 0;
        window.location.reload()
      }
      return null;
    });
    return null;
  }

  logOff(): void {
    this.isLogged = false;
    const token = sessionStorage.getItem('token');
    if (token !== null) {
      sessionStorage.clear();
      this.resetAllTabs();
      this.tabGroup.selectedIndex = 0;
      window.location.reload()
    } else {
      return;
    }
  }

  signUp() {
  }

  resetAllTabs() {
  }


  showPostProfile(uid: string) {
    this._userService.getUserById(uid).subscribe(user => {
      this.postUser = user;
    });
  }


}
