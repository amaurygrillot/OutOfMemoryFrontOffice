import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {LocalStorageService} from "@app/auth/services/local-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  private _url = "http://localhost:3000/api";
  token!: string;
  loginForm = new FormGroup({
    email: new FormControl(null, [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(4)
    ])
  });

  constructor(
    private http: HttpClient, private localStorage: LocalStorageService, private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  logIn() {
    const body = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }

    this.http
      .post(this._url + "/auth-login", body).toPromise()
      .then(response => {

        const tmp = JSON.stringify(response).split("\"");
        this.token = tmp[3];

        console.log(this.token);

        this.localStorage.set("JWTToken", this.token);
        this.router.navigateByUrl('').then(() => {
          window.location.reload()
        });
      })
      .catch(err => {
        return
      });
  }
}
