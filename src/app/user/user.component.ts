import { Component, OnInit } from '@angular/core';
import {UserService} from "@app/services/user.service";
import {Post, User} from "@app/shared/models";
import {PostService} from "@app/services/post.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  URL = "https://outofmemoryerror-back.azurewebsites.net"
  user!: User
  userPosts!: Post[]
  loading = true;

  userId = sessionStorage.getItem("userId")

  constructor(private userService: UserService, private postService: PostService) { }

  ngOnInit(): void {
    this.userService.getUserById(this.userId!).subscribe(user => {
      this.user = user;
      this.loading = false;
    });
    /*
    this.postService.getPostsByUserId(this.userId!).subscribe(posts => {
      this.userPosts = posts;
      this.postsOk = true;
    });
     */
  }

}
