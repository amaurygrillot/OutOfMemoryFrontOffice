import {Component, Inject, Input, OnInit} from '@angular/core';
import {PostService} from "@app/services/post.service";
import {Comment} from "@app/shared/models";
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-all-comments-by-post',
  templateUrl: './all-comments-by-post.component.html',
  styleUrls: ['./all-comments-by-post.component.css']
})
export class AllCommentsByPostComponent implements OnInit {

  post_uid!: string
  post_name!: string;
  comments!: Comment[];

  messageFormControl = new FormControl('', [Validators.required]);
  hasCommented = false;
  message_comment = "";

  isLoading = true;

  constructor(private _postService: PostService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.post_uid = this.data.post_uid;
    this.post_name = this.data.post_name;
  }

  ngOnInit(): void {
    console.log("all comments", this.post_uid)
    this._postService.getCommentsByPostId(this.post_uid).subscribe(comments => {
      this.comments = comments;
      console.log(comments)
      this.isLoading = false;
    }, error => {
      console.log(error)
    })
  }

  messageIsNotNull() {
    return !this.messageFormControl.hasError('required');
  }

  submitComment() {
    const message = this.messageFormControl?.value;
    this._postService.createNewComment(this.post_uid, message).subscribe(res => {
      this.hasCommented = true;
      this.message_comment = "Comment added."
      this._postService.getCommentsByPostId(this.post_uid).subscribe(comments => {
        this.comments = comments;
      })
    });
  }

}
