import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Follow, Notification, User} from "../shared/models";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "@environments/environment";
import {SharedComponent} from "@app/shared/shared.component";

@Injectable()
export class UserService {

  private _URL = environment.baseUrl;
  private _API_URL = `${this._URL}/api`

  header = new HttpHeaders()
    .set('Authorization', `${sessionStorage.getItem('token')}`)
    .set('Content-Type', 'application/json');

  constructor(private http: HttpClient, private _sharedComponent: SharedComponent) {
  }

  getUserById(userId: string) {
    return new Observable<User>((observer) => {
      this.http.get(`${this._API_URL}/user/getAnotherUserById/${userId}`, {headers: this.header}).subscribe(async (result: any) => {
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
    return this.http.post<any>(`${this._API_URL}/user/addNewFriend`, body, {headers: this.header});
  }

  unfollowUser(uid_following_user: string) {
    return this.http.delete<any>(`${this._API_URL}/user/deleteFollowing/${uid_following_user}`, {headers: this.header});
  }

  acceptFollowRequest(uid_following_user: string, uid_notification: string) {
    const body = {
      'uidFriend': uid_following_user,
      'uidNotification': uid_notification
    }
    return this.http.post<any>(`${this._API_URL}/user/acceptFollowerRequest`, body, {headers: this.header});
  }

  removeFollower(uid_follower: string) {
    return this.http.delete<any>(`${this._API_URL}/user/deleteFollowers/${uid_follower}`, {headers: this.header});
  }

  getAllFollowing() {
    return new Observable<Follow[]>((observer) => {
      this.http.get(`${this._API_URL}/user/getAllFollowings`, {headers: this.header}).subscribe(async (results: any) => {
        const following = [];
        for (const result of results.followings) {
          const follow = new Follow(
            result.uid_friend,
            result.uid_user,
            this._sharedComponent.formatDate(result.date_friend),
            result.username,
            result.fullname,
            result.avatar
          );
          following.push(follow)
        }
        observer.next(following);
        observer.complete();
      }, error => {
        observer.error(error);
        observer.complete();
      })
    });
  }

  getAllFollowers() {
    return new Observable<Follow[]>((observer) => {
      this.http.get(`${this._API_URL}/user/getAllFollowers`, {headers: this.header}).subscribe(async (results: any) => {
        const followers = [];
        for (const result of results.followers) {
          const follow = new Follow(
            result.idFollower,
            result.uid_user,
            this._sharedComponent.formatDate(result.date_followers),
            result.username,
            result.fullname,
            result.avatar
          );
          followers.push(follow)
        }
        observer.next(followers);
        observer.complete();
      }, error => {
        observer.error(error);
        observer.complete();
      })
    });
  }

  getAllNotificationsByUser() {
    return new Observable<Notification[]>((observer) => {
      this.http.get(`${this._API_URL}/notification/getNotificationsByUser`, {headers: this.header}).subscribe(async (results: any) => {
        const notifs = [];
        for (const result of results.notificationsdb) {
          const notif = new Notification(
            result.uid_notification,
            result.type_notification,
            this._sharedComponent.formatDate(result.created_at),
            result.user_uid,
            result.username,
            result.followers_uid,
            result.follower,
            result.avatar,
            result.post_uid
          );
          notifs.push(notif)
        }
        observer.next(notifs);
        observer.complete();
      }, error => {
        observer.error(error);
        observer.complete();
      })
    });
  }

  getAllNotificationsByUserId(userId: string) {
    return new Observable<Notification[]>((observer) => {
      this.http.get(`${this._API_URL}/notification/getNotificationsByUserId/${userId}`, {headers: this.header}).subscribe(async (results: any) => {
        const notifs = [];
        for (const result of results.notificationsdb) {
          const notif = new Notification(
            result.uid_notification,
            result.type_notification,
            this._sharedComponent.formatDate(result.created_at),
            result.user_uid,
            result.username,
            result.followers_uid,
            result.follower,
            result.avatar,
            result.post_uid
          );
          notifs.push(notif)
        }
        observer.next(notifs);
        observer.complete();
      }, error => {
        observer.error(error);
        observer.complete();
      })
    });
  }

}
