import {Component, Input, OnInit} from '@angular/core';
import {Notification, Post} from "@app/shared/models";
import {environment} from "@environments/environment";
import {PostService} from "@app/services/post.service";
import {UserService} from "@app/services/user.service";
import {ProfileComponent} from "@app/user/profile/profile.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  @Input() notification!: Notification
  URL = environment.baseUrl

  type!: string
  post!: Post
  post_title!: string
  hasConfirmed =  false
  confirmationButtonValue!: string
  notificationUsername!: string;

  userId = sessionStorage.getItem("userId");

  constructor(private _postService: PostService, private _userService: UserService, private _dialog: MatDialog) { }

  ngOnInit(): void {
    this.notificationUsername = this.notification.followers_uid === this.userId ? "You" : this.notification.follower;
    this.type = this.notification.type_notification
    if (this.type === "1") {
      this.confirmationButtonValue = "Accept"
    }
    else if (this.type === "2") {
      this.setPostTitle();
    }
  }

  setPostTitle() {
    this._postService.getPostByPostId(this.notification.post_uid).subscribe(post => {
      this.post = post;
      this.post_title = this.post.title;
    });
  }

  acceptFollow() {
    this._userService.acceptFollowRequest(this.notification.followers_uid, this.notification.uid_notification).subscribe(res => {
      this.hasConfirmed = true;
      this.confirmationButtonValue = "Accepted"
    })
  }

  openProfile() {
    const dialogRef = this._dialog.open(ProfileComponent, {
      width: '800px',
      height: '750px',
      data: {
        'userId': this.notification.followers_uid
      }
    });
    dialogRef.afterClosed().subscribe(result => {});
  }
}
