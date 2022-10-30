import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MatDialogRef} from "@angular/material/dialog";
import {TokenService} from "@app/auth/services/token.service";
import {environment} from "@environments/environment";
import {AppComponent} from "@app/app.component";
import {lastValueFrom} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  private _url = environment.apiUrl;
  hide = false;
  show = true;
  loading = false;
  displayUser = false;
  loginForm!: FormGroup;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<LoginComponent>,
    private tokenService: TokenService
  ) {
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup(
      {
        login: new FormControl('', [Validators.required, Validators.minLength(4)]),
        password: new FormControl('', [Validators.required, Validators.minLength(4)])
      }
    );
  }

  onLogin() {
    this.loading = true;
    const header = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('Content-Type', 'application/json');
    const userBody = {
      email: `${this.loginForm.get('login')?.value}`,
      password: `${this.loginForm.get('password')?.value}`
    };
    this.http.post(`${this._url}/authLogin`, userBody,
      {headers: header}).subscribe(async (data: any) => {
        if (data === null) {
          sessionStorage.clear();
          this.loading = false;
          return;
        }
        sessionStorage.setItem('token', data.token);
        const userId = this.getUserId(data.token).idPerson;
        sessionStorage.setItem('userId', userId);
        await this.setUsername();
        this.dialogRef.close();
        this.loading = false;
      },
      (error => {
        console.log("Incorrect credentials");
        this.loading = false;
      }));
  }

  getUserId(token: string): any {
    this.tokenService.setToken(token);
    this.tokenService.decodeToken();
    return this.tokenService.getUserId();
  }

  async setUsername()
  {
    const headers = new HttpHeaders()
      .set('Authorization', `${sessionStorage.getItem('token')}`)
    lastValueFrom(this.http.get<any>("https://outofmemoryerror-back.azurewebsites.net/api/user/getUserById",
      {headers : headers}))
      .then((data =>
      {
        console.log(data)
        sessionStorage.setItem("username", data.user.username);
      }))
  }

  onNoClick(submitEvent: Event): void {
    submitEvent.preventDefault();
    this.dialogRef.close();
  }

  showPassword(submitEvent: Event) {
    this.hide = !this.hide;
    submitEvent.preventDefault();
  }
}
