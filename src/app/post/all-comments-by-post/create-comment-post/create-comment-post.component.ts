import {Component, Input, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {PostService} from "@app/services/post.service";

@Component({
  selector: 'app-create-comment-post',
  templateUrl: './create-comment-post.component.html',
  styleUrls: ['./create-comment-post.component.css']
})
export class CreateCommentPostComponent implements OnInit {

  @Input() post_uid!: string
  messageFormControl = new FormControl('', [Validators.required]);

  hasCommented = false;
  message_comment = "";

  constructor(private _postService: PostService) { }

  ngOnInit(): void {
  }

  messageIsNotNull() {
    return !this.messageFormControl.hasError('required');
  }

  submitComment() {
    const message = this.messageFormControl?.value;
    this._postService.createNewComment(this.post_uid, message).subscribe(res => {
      this.hasCommented = true;
      this.message_comment = "Comment added."
    })
  }

}
