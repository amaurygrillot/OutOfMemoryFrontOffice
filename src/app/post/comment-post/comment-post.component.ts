import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-comment-post',
  templateUrl: './comment-post.component.html',
  styleUrls: ['./comment-post.component.css']
})
export class CommentPostComponent implements OnInit {

  @Input() countComments!: bigint

  constructor() { }

  ngOnInit(): void {
  }

}
