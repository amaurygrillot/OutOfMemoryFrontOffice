import {Component, Inject, OnInit} from '@angular/core';
import {PostService} from "@app/services/post.service";
import {Comment} from "@app/shared/models";
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-all-comments-by-post',
  templateUrl: './all-comments-by-post.component.html',
  styleUrls: ['./all-comments-by-post.component.css']
})
export class AllCommentsByPostComponent implements OnInit {

  post_uid!: string
  post_name!: string;
  comments!: Comment[];

  isLoading = true;

  constructor(private _postService: PostService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.post_uid = this.data.post_uid;
    this.post_name = this.data.post_name;
  }

  ngOnInit(): void {
    console.log("all comments", this.post_uid)
    this._postService.getCommentsByPostId(this.post_uid).subscribe(comments => {
      this.comments = comments.slice(1);
      console.log(comments)
      this.isLoading = false;
    }, error => {
      console.log(error)
    })
  }

}
