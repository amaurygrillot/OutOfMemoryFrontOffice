import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../shared/models";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class UserService {

  private _URL = "https://outofmemoryerror-back.azurewebsites.net"
  private _API_URL = `${this._URL}/api`

  header = new HttpHeaders()
    .set('Authorization', `${sessionStorage.getItem('token')}`)
    .set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  getUserById(userId: string) {
    return new Observable<User>((observer) => {
      this.http.get(`${this._API_URL}/user/getAnotherUserById/${userId}`, { headers : this.header}).subscribe(async (result: any) => {
        const userInfo = result.anotherUser;
        const user = new User(
          userInfo.uid,
          userInfo.fullName,
          userInfo.phone,
          userInfo.image,
          userInfo.cover,
          userInfo.birthday_date,
          userInfo.created_at,
          userInfo.username,
          userInfo.description,
          userInfo.is_private,
          userInfo.is_online,
          userInfo.email
        );
        observer.next(user);
        observer.complete();
      }, error => {
        observer.error(error);
        observer.complete();
      })
    });
  }
}
