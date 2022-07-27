import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Post} from "@app/shared/models";
import {PostService} from "@app/services/post.service";
import {AppComponent} from "@app/app.component";
import {SharedComponent} from "@app/shared/shared.component";

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostsComponent implements OnInit, OnChanges {
  @Input() allPosts!: boolean
  URL = "https://outofmemoryerror-back.azurewebsites.net"
  posts!: Post[];
  isLoading = true;
  isLogged = sessionStorage.getItem('token') !== null;
  constructor(private postService: PostService) { }

  ngOnInit(): void {

  }

  ngOnChanges(): void {
    if(this.allPosts)
    {
      this.postService.getAllPosts().subscribe(posts => {
        console.log(posts)
        this.posts = posts;
        this.isLoading = false;
      });
    }
    else
    {
      this.postService.getPostsByUserId(sessionStorage.getItem('userId') || '').subscribe(posts => {
        console.log(posts)
        this.posts = posts;
        this.isLoading = false;
      });
    }

  }


}
