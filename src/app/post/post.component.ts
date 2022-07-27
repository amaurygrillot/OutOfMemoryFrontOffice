import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Post} from "@app/shared/models";
import {AppComponent} from "@app/app.component";
import {PostService} from "@app/services/post.service";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnChanges {
  @Input() post!: Post;

  URL = "https://outofmemoryerror-back.azurewebsites.net"

  isLogged = sessionStorage.getItem('token') !== null
  userId = sessionStorage.getItem('userId');

  hasLoaded = false;
  isLiked = false;

  constructor(private _appComponent: AppComponent, private _postService: PostService) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.hasLoaded = true;
  }

  showLogin() {
    this._appComponent.showLogin();
  }

  setLike() {
    console.log(this.post.post_uid, this.userId)
    this._postService.likeOrUnlikePost(this.post.post_uid, this.userId!).subscribe(res => {
      this.isLiked = res.message === 'like';
      console.log("res", res);
    }, error => {
      console.log(error)
    });
    console.log("isLiked", this.isLiked)
  }

  setComment() {

  }
}
