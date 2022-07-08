import { Injectable } from '@angular/core';
import jwtDecode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  jwtToken!: string;
  infoToken! : { [key: string]: string };

  constructor() { }

  setToken(token: string) {
    if (token) {
      this.jwtToken = token;
    }
  }

  decodeToken() {
    if (this.jwtToken) {
      this.infoToken = jwtDecode(this.jwtToken);
    }
  }
}
