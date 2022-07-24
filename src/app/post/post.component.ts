import { Component, OnInit } from '@angular/core';
import {Post} from "@app/shared/models";
import {PostService} from "@app/services/post.service";
import {AppComponent} from "@app/app.component";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  URL = "https://outofmemoryerror-back.azurewebsites.net"
  posts!: Post[];

  isLogged = sessionStorage.getItem('token') !== null;

  constructor(private postService: PostService, private appComponent: AppComponent) { }

  ngOnInit(): void {
    this.postService.getAllPosts().subscribe(posts => {
      this.posts = posts;
    });
  }
}
