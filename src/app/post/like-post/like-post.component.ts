import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-like-post',
  templateUrl: './like-post.component.html',
  styleUrls: ['./like-post.component.css']
})
export class LikePostComponent implements OnInit {
  @Input() countLikes!: bigint;

  constructor() { }

  ngOnInit(): void {
  }

}
