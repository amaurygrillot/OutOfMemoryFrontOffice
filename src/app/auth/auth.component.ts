import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TokenService} from "@app/auth/services/token.service";
import {LocalStorageService} from "@app/auth/services/local-storage.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  @Output() isLogged = new EventEmitter<boolean>()

  constructor(private tokenService: TokenService, private localStorage: LocalStorageService, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.isAuthenticated();
  }

  private isAuthenticated() {
    let tokenKey: string = "JWTToken";

    let tokenValue = this.localStorage.get(tokenKey);

    if (tokenValue) {
      this.tokenService.setToken(tokenValue);

      //this.getUser(this.tokenService.getEmailId())

      this.updateLoggedStatus(true);
    } else {
      this.updateLoggedStatus(false);
    }
  }

  updateLoggedStatus(value : boolean) {
    this.isLogged.emit(value);
  }


}
