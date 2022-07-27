import {Component, Input, OnInit} from '@angular/core';
import {PostService} from "@app/services/post.service";

@Component({
  selector: 'app-like-post',
  templateUrl: './like-post.component.html',
  styleUrls: ['./like-post.component.css']
})
export class LikePostComponent implements OnInit {
  @Input() countLikes!: number;

  constructor(private _postService: PostService) { }

  ngOnInit(): void {  }
}
