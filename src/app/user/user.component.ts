import { Component, OnInit } from '@angular/core';
import {Post, User} from "@app/shared/models";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {SharedComponent} from "@app/shared/shared.component";
import {UserService} from "@app/services/user.service";
import {PostService} from "@app/services/post.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  URL = "https://outofmemoryerror-back.azurewebsites.net"
  posts!: Post[]
  user!: User

  showMenu = false
  loading = true

  userId = sessionStorage.getItem('userId')

  constructor(private http: HttpClient, private userService: UserService, private postService: PostService) { }

  ngOnInit(): void {
    console.log("userId", this.userId)
    this.userService.getUserById(this.userId!).subscribe(user => {
      this.user = user;
      this.loading = false
      this.showMenu = true
    });
    this.postService.getPostsByUserId(this.userId!).subscribe(posts => {
      this.posts = posts;
    })
  }
}
