import {Component, OnInit, ViewChild} from '@angular/core';
import {LoginComponent} from "@app/auth/login/login.component";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "@app/shared/models";
import {MatTabGroup} from "@angular/material/tabs";
import {MatDialog} from "@angular/material/dialog";
import {SharedComponent} from "@app/shared/shared.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'OutOfMemoryFrontOffice';
  isLogged = sessionStorage.getItem('token') !== null;
  private _url = "https://outofmemoryerror-back.azurewebsites.net/api"

  showEditor = false
  showMenuUser = false
  showPostCreated = true
  showSignup = false
  static sharedComponent: SharedComponent;
  @ViewChild('tabGroup') tabGroup!: MatTabGroup;

  constructor(private http: HttpClient, public dialog: MatDialog, private _sharedComponent: SharedComponent) {
    AppComponent.sharedComponent = _sharedComponent;
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
        this.showMenuUser = true;

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
    this.showPostCreated = true;
    this.showEditor = false;
    this.showMenuUser = false;
    this.showSignup = false;
  }

  showPost() {
    this.showPostCreated = true;
    this.showEditor = false;
    this.showSignup = false;
  }

  showCreatePost() {
    this.showPostCreated = false;
    this.showEditor = true;
    this.showSignup = false;
  }

  showSignUp() {
    this.showPostCreated = false;
    this.showEditor = false;
    this.showSignup = true;
  }
}
