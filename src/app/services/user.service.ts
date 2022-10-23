import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../shared/models";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "@environments/environment";

@Injectable()
export class UserService {

  private _URL = environment.baseUrl;
  private _API_URL = `${this._URL}/api`

  header = new HttpHeaders()
    .set('Authorization', `${sessionStorage.getItem('token')}`)
    .set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  getUserById(userId: string) {
    return new Observable<User>((observer) => {
      this.http.get(`${this._API_URL}/user/getAnotherUserById/${userId}`, { headers : this.header}).subscribe(async (result: any) => {
        const userInfo = result.anotherUser;
        const userAnalytics = result.analytics;
        const user = new User(
          userInfo.uid,
          userInfo.fullname,
          userInfo.phone,
          userInfo.image,
          userInfo.cover,
          userInfo.birthday_date,
          userInfo.created_at,
          userInfo.username,
          userInfo.description,
          userInfo.is_private,
          userInfo.is_online,
          userInfo.email,
          userAnalytics.posters,
          userAnalytics.friends,
          userAnalytics.followers
        );
        observer.next(user);
        observer.complete();
      }, error => {
        observer.error(error);
        observer.complete();
      })
    });
  }

  followUser(uid_following_user: string) {
    const body = {
      'uidFriend': uid_following_user
    }
    return this.http.post<any>(`${this._API_URL}/user/addNewFriend`, body, { headers: this.header });
  }

  unfollowUser(uid_following_user: string) {
    return this.http.delete<any>(`${this._API_URL}/user/deleteFollowing/${uid_following_user}`,{ headers: this.header });
  }

  acceptFollowRequest(uid_following_user: string, uid_notification: string) {
    const body = {
      'uidFriend': uid_following_user,
      'uidNotification': uid_notification
    }
    return this.http.post<any>(`${this._API_URL}/user/acceptFollowerRequest`, body, { headers: this.header });
  }

  getAllFollowing() {
    return this.http.get<any>(`${this._API_URL}/user/getAllFollowings`, { headers : this.header})
  }


}
