import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Post} from "@app/shared/models";
import {AppComponent} from "@app/app.component";
import {PostService} from "@app/services/post.service";
import {LoginComponent} from "@app/auth/login/login.component";
import {AllCommentsByPostComponent} from "@app/post/all-comments-by-post/all-comments-by-post.component";
import {MatDialog} from "@angular/material/dialog";
import {environment} from "@environments/environment.prod";
import {ProfileComponent} from "@app/user/profile/profile.component";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnChanges {
  @Input() post!: Post;
  @Input() lastIndex!: number;

  URL = environment.baseUrl;

  isLogged = sessionStorage.getItem('token') !== null
  userId = sessionStorage.getItem('userId');

  hasLoaded = false;
  isLiked = false;

  count_likes!: number;
  message_like!: string;
  count_comments!: number;

  constructor(
    private _appComponent: AppComponent,
    private _postService: PostService,
    private _dialog: MatDialog,
  ) {}


  ngOnInit(): void {
    this.count_likes = this.post.count_likes;
    this.count_comments = this.post.count_comment - 1;
    this.hasLike()
  }

  ngOnChanges(): void {
    this.hasLoaded = true;
  }

  showLogin() {
    this._appComponent.showLogin();
  }

  showPostProfile() {
    this._appComponent.showPostProfile(this.post.person_uid);
    if (this.isLogged) this._appComponent.tabGroup.selectedIndex = 4;
  }

  hasLike() {
    if (this.isLogged) {
      this._postService.getLikesUser(this.post.post_uid).subscribe(res => {
        this.isLiked = res === 1
      });
    }
  }

  setLike() {
    this._postService.likeOrUnlikePost(this.post.post_uid, this.userId!).subscribe(res => {
      this.isLiked = res.message === 'like';
      this.isLiked ? this.count_likes++ : this.count_likes--;
      this.isLiked ? this.message_like = "You liked this post." : this.message_like = "You removed your like.";
    }, error => {
      console.log(error)
    });
  }

  setComment() {
    const dialogRef = this._dialog.open(AllCommentsByPostComponent, {
      width: '700px',
      height: '550px',
      data: {
        'post_uid': this.post.post_uid,
        'post_name': this.post.title
      }
    });
    dialogRef.afterClosed().subscribe(_ => {
      this.count_comments = this.post.count_comment;
    });
  }

  openProfile() {
    this._appComponent.tabGroup.selectedIndex = 4;
    const dialogRef = this._dialog.open(ProfileComponent, {
      width: '800px',
      height: '750px',
      data: {
        'userId': this.post.person_uid
      }
    });
    dialogRef.afterClosed().subscribe(_ => {
      this._appComponent.tabGroup.selectedIndex = this.lastIndex;
    });
  }
}
