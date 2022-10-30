import {Component, Inject, Input, OnChanges, OnInit} from '@angular/core';
import {Notification, Post, User} from "@app/shared/models";
import {environment} from "@environments/environment";
import {UserService} from "@app/services/user.service";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {PostService} from "@app/services/post.service";
import {AllFollowingComponent} from "@app/user/all-following/all-following.component";
import {AllFollowersComponent} from "@app/user/all-followers/all-followers.component";
import {AppComponent} from "@app/app.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user!: User
  userId!: string
  profilePosts!: Post[]

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

  constructor(
    private _userService: UserService,
    private _postService: PostService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _dialog: MatDialog
  ) {
    this.userId = data.userId;
  }

  ngOnInit(): void {
    this.initUser(this.userId);
  }

  initUser(userId: string) {
    this._userService.getUserById(userId).subscribe(user => {
      this.user = user;
      this.count_posts = this.user.count_posts;
      this.count_following = this.user.count_following;
      this.count_followers = this.user.count_followers;
      this.isNotLoggedUser = sessionStorage.getItem('userId') !== this.user.uid;
      this.initUserPosts();
      this.updateFollowStatus();
      this.isLoading = false;
    });
  }

  initUserPosts() {
    this._postService.getPostsByOtherUserId(this.userId).subscribe(posts => {
      this.profilePosts = posts;
    })
  }

  follow() {
    this._userService.followUser(this.userId).subscribe(_ => {
      this.ngOnInit()
    })
  }

  unfollow() {
    this._userService.unfollowUser(this.userId).subscribe(_ => {
      this.ngOnInit()
    })
  }

  updateFollowStatus() {
    this._followIsInPendingRequest()
    this._isAlreadyFollowed()
    this.setFollowedButton()
  }

  private _isAlreadyFollowed() {
    this.isFollowing = false;
    if (this.isNotLoggedUser) {
      this._userService.getAllFollowing().subscribe(following => {
        for (const follow of following) {
          if (follow.uid_user === this.user.uid) {
            this.isFollowing = true;
            break;
          }
        }
      });
    }
  }

  private _followIsInPendingRequest() {
    this.isPending = false;
    if (this.isNotLoggedUser) {
      const userLoggedId = sessionStorage.getItem('userId');
      this._userService.getAllNotificationsByUserId(this.userId).subscribe(notifications => {
        for (const notif of notifications) {
          if (notif.type_notification == "1") {
            if (notif.user_uid === this.user.uid && notif.followers_uid === userLoggedId) {
              this.isPending = true;
              break;
            }
          }
        }
      });
    }
  }

  setFollowedButton() {
    this.followButtonValue = "FOLLOWED"
    this.mouseOverFollow = false
  }

  setUnfollowButton() {
    this.followButtonValue = "UNFOLLOW"
    this.mouseOverFollow = true
  }

  showFollowing() {
    const dialogRef = this._dialog.open(AllFollowingComponent, {
      width: '400px',
      height: '500px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {});
  }

  showFollowers() {
    const dialogRef = this._dialog.open(AllFollowersComponent, {
      width: '400px',
      height: '500px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {});
  }
}



