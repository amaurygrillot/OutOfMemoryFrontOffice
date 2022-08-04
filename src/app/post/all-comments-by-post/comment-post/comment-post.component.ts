import {Component, Input, OnInit} from '@angular/core';
import {Comment} from "src/app/shared/models";
import {PostService} from "@app/services/post.service";

@Component({
  selector: 'app-comment-post',
  templateUrl: './comment-post.component.html',
  styleUrls: ['./comment-post.component.css']
})
export class CommentPostComponent implements OnInit {

  @Input() comment!: Comment

  URL = "https://outofmemoryerror-back.azurewebsites.net";
  count_likes!: number;
  message_like!: string;
  isLiked = false;

  constructor(private _postService: PostService) {}

  ngOnInit(): void {
    this.count_likes = this.comment.is_like;
    this.message_like = "";
  }

  setLike() {
    this._postService.likeOrUnlikeComment(this.comment.uid).subscribe(res => {
      this.isLiked = res.message === 'like comment';
      this.isLiked ? this.count_likes++ : this.count_likes--;
      this.isLiked ? this.message_like = "You liked this comment." : this.message_like = "You removed your like.";
    }, error => {});
  }
}
