import {Component, ViewChild} from '@angular/core';
import {LoginComponent} from "@app/auth/login/login.component";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "@app/shared/models";
import {MatTabGroup} from "@angular/material/tabs";
import {MatDialog} from "@angular/material/dialog";
import {DomSanitizer} from "@angular/platform-browser";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'OutOfMemoryFrontOffice';
  isLogged = sessionStorage.getItem('token') !== null;
  private _url = "https://outofmemoryerror-back.azurewebsites.net/api"

  showEditor = false

  image: any;
  @ViewChild('tabGroup') tabGroup: MatTabGroup | undefined;

  constructor(private http: HttpClient, public dialog: MatDialog, private router: Router) {
    console.log(sessionStorage);
    this.image = sessionStorage.getItem('image');
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

        const user = await this.http.get<any>(`${this._url}/user/getAnotherUserById/${sessionStorage.getItem('userId')}`,
          {headers: header})
          .toPromise();

        console.log(JSON.stringify(user));

        /*
        const arrayBufferImage = await this.http.get(`http://localhost:3000/user/file/${user.image}`,
          {headers: header, responseType: 'arraybuffer'}).toPromise();
        let binary = '';
        const bytes = new Uint8Array( arrayBufferImage );
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
          binary += String.fromCharCode( bytes[ i ] );
        }
        const image = 'data:image/jpeg;base64,' + btoa(binary);
        sessionStorage.setItem('image', image);

         */

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
    } else {
      return;
    }
  }

  signUp() {

  }

  resetAllTabs() {
    this.showEditor = false;
  }

  showCreatePost() {
    this.showEditor = true;
  }
}
