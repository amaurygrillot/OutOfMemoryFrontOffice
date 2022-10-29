import {Component, ViewChild} from '@angular/core';
import {LoginComponent} from "@app/auth/login/login.component";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "@app/shared/models";
import {MatTabChangeEvent, MatTabGroup} from "@angular/material/tabs";
import {MatDialog} from "@angular/material/dialog";
import {environment} from "@environments/environment";
import {UserService} from "@app/services/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'OutOfMemoryFrontOffice';
  isLogged = sessionStorage.getItem('token') !== null;
  private _url = environment.apiUrl;

  showEditor = false
  displayMenuUser = false
  displayAllPosts = true
  displayMyPosts = false
  displayCreatePost = false
  displaySignUp = false
  displayProfile = false
  displaySettings = false
  displayPostProfile = false
  displayMyNotifications = false

  currentUser!: User
  postUser!: User

  @ViewChild('tabGroup') tabGroup!: MatTabGroup;

  constructor(private http: HttpClient, public dialog: MatDialog, private _userService: UserService) {
    //console.log(sessionStorage);
    this._userService.getUserById(sessionStorage.getItem('userId')!).subscribe(user => {
      this.currentUser = user;
    });
    //console.log(this.currentUser);
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
    } else if (index == 3) {
      this.showMyNotifications();
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
    this.displayPostProfile = false;
    this.displayMyNotifications = false;
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
    this.displayPostProfile = false;
    this.displayMyNotifications = false;
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
    this.displayPostProfile = false;
    this.displayMyNotifications = false;
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
    this.displayPostProfile = false;
    this.displayMyNotifications = false;
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
    this.displayPostProfile = false;
    this.displayMyNotifications = false;
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
    this.displayPostProfile = false;
    this.displayMyNotifications = false;
  }

  showPostProfile(uid: string) {
    this._userService.getUserById(uid).subscribe(user => {
      this.postUser = user;
    });
    this.displayAllPosts = false;
    this.displayMyPosts = false;
    this.displayCreatePost = false;
    this.showEditor = false;
    this.displayMenuUser = false;
    this.displaySignUp = false;
    this.displayProfile = false;
    this.displaySettings = false;
    this.displayPostProfile = true;
    this.displayMyNotifications = false;
  }

  showMyNotifications() {
    this.displayAllPosts = false;
    this.displayMyPosts = false;
    this.displayCreatePost = false;
    this.showEditor = false;
    this.displayMenuUser = false;
    this.displaySignUp = false;
    this.displayProfile = false;
    this.displaySettings = false;
    this.displayPostProfile = false;
    this.displayMyNotifications = true;
  }
}
