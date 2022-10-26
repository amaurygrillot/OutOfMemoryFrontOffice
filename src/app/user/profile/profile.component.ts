import {Component, Inject, Input, OnInit} from '@angular/core';
import {Notification, User} from "@app/shared/models";
import {environment} from "@environments/environment";
import {UserService} from "@app/services/user.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @Input() user!: User
  userId!: string

  URL = environment.baseUrl
  isNotLoggedUser!: boolean
  isLoading = true

  count_posts!: number
  count_following!: number
  count_followers!: number

  followButtonValue!: string
  mouseOverFollow = false

  isFollowing!: boolean
  isPending!: boolean

  constructor(private _userService: UserService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.userId = data.userId;
  }

  ngOnInit(): void {
    this.initUser(this.userId);
    this.setFollowedButton()
    this.setIsPending()
    this.setIsFollowing()
    console.log(`
      session_userId: ${sessionStorage.getItem('userId')},
      post_userId: ${this.user.uid},
      bool: ${this.isNotLoggedUser}
    `)
    console.log(`all_following: ${this._userService.getAllFollowing()}`);
  }

  initUser(userId: string) {
    this._userService.getUserById(userId).subscribe(user => {
      this.user = user;
      this.count_posts = this.user.count_posts;
      this.count_following = this.user.count_following;
      this.count_followers = this.user.count_followers;
      this.isNotLoggedUser = sessionStorage.getItem('userId') !== this.user.uid;
      this.isLoading = false;
    });
  }

  follow() {

  }

  unfollow() {

  }

  setIsFollowing() {
    this.isFollowing = !this.isPending && this._isAlreadyFollowed()
    console.log(`setIsFollowing ${this.isFollowing}`)
  }

  setIsPending() {
    this.isPending = this.isNotLoggedUser && this._followIsInPendingRequest();
  }

  private _isAlreadyFollowed() {
    let found = false;
    this._userService.getAllFollowing().subscribe(following => {
      for (const follow of following) {
        if (follow.id_follow === this.user.uid) {
          found = true;
          console.log(`${follow.id_follow} ${this.user.uid} ${found}`);
          break;
        }
      }
    });
    return found;
  }

  private _followIsInPendingRequest() {
    let found = false;
    this._userService.getAllNotificationsByUser().subscribe(notifications => {
      for (const notif of notifications) {
        if (notif.type_notification === "1") {
          if (notif.followers_uid === this.user.uid) {
            found = true;
            break;
          }
        }
      }
    });
    return found;
  }

  setFollowedButton() {
    this.followButtonValue = "FOLLOWED"
    this.mouseOverFollow = false
  }

  setUnfollowButton() {
    this.followButtonValue = "UNFOLLOW"
    this.mouseOverFollow = true
  }
}



