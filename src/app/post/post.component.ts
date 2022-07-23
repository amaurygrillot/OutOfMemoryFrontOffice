import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Post} from "@app/shared/models";
import {SharedComponent} from "@app/shared/shared.component";
import {PostService} from "@app/services/post.service";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  URL = "https://outofmemoryerror-back.azurewebsites.net"
  posts!: Post[];

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getAllPosts().subscribe(posts => {
      this.posts = posts;
    });
  }


}
