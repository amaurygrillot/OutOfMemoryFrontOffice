import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Post} from "@app/shared/models";
import {PostService} from "@app/services/post.service";
import {AppComponent} from "@app/app.component";
import {SharedComponent} from "@app/shared/shared.component";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnChanges {
  @Input() post!: Post;
  URL = "https://outofmemoryerror-back.azurewebsites.net"
  hasLoaded = false;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.hasLoaded = true;
  }


}
