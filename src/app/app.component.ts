import {Component, ViewChild} from '@angular/core';
import {LoginComponent} from "@app/auth/login/login.component";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "@app/shared/models";
import {MatTabChangeEvent, MatTabGroup} from "@angular/material/tabs";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'OutOfMemoryFrontOffice';
  isLogged = sessionStorage.getItem('token') !== null;
  private _url = "https://outofmemoryerror-back.azurewebsites.net/api"

  showEditor = false
  displayMenuUser = false
  displayAllPosts = true
  displayMyPosts = false
  displayCreatePost = false
  displaySignUp = false
  displayProfile = false
  displaySettings = false

  @ViewChild('tabGroup') tabGroup!: MatTabGroup;

  constructor(private http: HttpClient, public dialog: MatDialog) {
    //console.log(sessionStorage);
  }

  public tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    const index = tabChangeEvent.index;
    if (index == 0) {
      this.showPost();
    } else if (index == 1) {
      this.showMyPosts();
    } else if (index == 2) {
      if (this.isLogged) this.showCreatePost();
      else this.showSignUp();
    }
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
    this.showPost()
  }

  showPost() {
    this.displayAllPosts = true;
    this.displayMyPosts = false;
    this.displayCreatePost = false;
    this.showEditor = false;
    this.displayMenuUser = false;
    this.displaySignUp = false;
    this.displayProfile = false;
    this.displaySettings = false;
  }

  showMyPosts() {
    this.displayAllPosts = false;
    this.displayMyPosts = true;
    this.displayCreatePost = false;
    this.showEditor = false;
    this.displayMenuUser = false;
    this.displaySignUp = false;
    this.displayProfile = false;
    this.displaySettings = false;
  }

  showCreatePost() {
    this.displayAllPosts = false;
    this.displayMyPosts = false;
    this.displayCreatePost = true;
    this.showEditor = false;
    this.displayMenuUser = false;
    this.displaySignUp = false;
    this.displayProfile = false;
    this.displaySettings = false;
  }

  showSignUp() {
    this.displayAllPosts = false;
    this.displayMyPosts = false;
    this.displayCreatePost = false;
    this.showEditor = false;
    this.displayMenuUser = false;
    this.displaySignUp = true;
    this.displayProfile = false;
    this.displaySettings = false;
  }

  showProfile() {
    this.displayAllPosts = false;
    this.displayMyPosts = false;
    this.displayCreatePost = false;
    this.showEditor = false;
    this.displayMenuUser = false;
    this.displaySignUp = false;
    this.displayProfile = true;
    this.displaySettings = false;
  }

  showSettings() {
    this.displayAllPosts = false;
    this.displayMyPosts = false;
    this.displayCreatePost = false;
    this.showEditor = false;
    this.displayMenuUser = false;
    this.displaySignUp = false;
    this.displayProfile = false;
    this.displaySettings = true;
  }
}
