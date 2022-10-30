import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Post} from "@app/shared/models";
import {environment} from "@environments/environment.prod";
import {AllCommentsByPostComponent} from "@app/post/all-comments-by-post/all-comments-by-post.component";
import {PostService} from "@app/services/post.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-profile-post',
  templateUrl: './profile-post.component.html',
  styleUrls: ['./profile-post.component.css']
})
export class ProfilePostComponent implements OnInit {
  @Input() post!: Post;
  @Input() hasLoaded!: boolean;

  URL = environment.baseUrl;

  isLogged = sessionStorage.getItem('token') !== null
  userId = sessionStorage.getItem('userId');

  isLiked = false;

  count_likes!: number;
  message_like!: string;
  count_comments!: number;

  constructor(private _postService: PostService, private _dialog: MatDialog) { }

  ngOnInit(): void {
    this.count_likes = this.post.count_likes;
    this.count_comments = this.post.count_comment - 1;
    this.hasLike();
  }

  hasLike() {
    if (this.isLogged) {
      this._postService.getLikesUser(this.post.post_uid).subscribe(res => {
        this.isLiked = res === 1;
      });
    }
  }

  setLike() {
    this._postService.likeOrUnlikePost(this.post.post_uid, this.userId!).subscribe(res => {
      this.isLiked = res.message === 'like';
      this.isLiked ? this.count_likes++ : this.count_likes--;
      this.isLiked ? this.message_like = "You liked this post." : this.message_like = "You removed your like.";
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


}
