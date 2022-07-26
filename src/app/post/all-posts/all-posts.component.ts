import { Component, OnInit } from '@angular/core';
import {Post} from "@app/shared/models";
import {PostService} from "@app/services/post.service";
import {AppComponent} from "@app/app.component";
import {SharedComponent} from "@app/shared/shared.component";

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostsComponent implements OnInit {

  URL = "https://outofmemoryerror-back.azurewebsites.net"
  posts!: Post[];
  isLoading = true;
  isLogged = sessionStorage.getItem('token') !== null;
  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getAllPosts().subscribe(posts => {
      this.posts = posts;
      this.isLoading = false;
    });
  }


}
