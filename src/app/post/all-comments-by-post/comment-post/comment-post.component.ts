import {Component, Input, OnInit} from '@angular/core';
import {Comment} from "src/app/shared/models";

@Component({
  selector: 'app-comment-post',
  templateUrl: './comment-post.component.html',
  styleUrls: ['./comment-post.component.css']
})
export class CommentPostComponent implements OnInit {

  @Input() comment!: Comment

  URL = "https://outofmemoryerror-back.azurewebsites.net";
  count_likes!: number;

  constructor() { }

  ngOnInit(): void {
  }

  setLike() {

  }
}
