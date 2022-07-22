import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Post} from "@app/shared/models";
import {DatePipe} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  URL = "https://outofmemoryerror-back.azurewebsites.net"
  private _API_URL = `${this.URL}/api`
  posts!: Post[];

  header = new HttpHeaders()
    .set('Authorization', `${sessionStorage.getItem('token')}`)
    .set('Content-Type', 'application/json');


  constructor(private http: HttpClient,  private datePipe: DatePipe, private router: Router) { }

  ngOnInit(): void {
    this.getAllPosts().subscribe(posts => {
      this.posts = posts;
    });
  }

  getAllPosts() {
    return new Observable<Post[]>((observer) => {
      this.http.get(`${this._API_URL}/post/getAllPosts`,  { headers : this.header}).subscribe((results: any) => {
        const posts = [];
        for (const result of results.posts) {
          const post = new Post(
            result.post_uid,
            result.is_comment,
            result.type_privacy,
            this.formatDate(result.created_at),
            result.person_uid,
            result.username,
            result.avatar,
            result.images,
            result.count_comment,
            result.count_likes,
            result.is_like);
          posts.push(post);
        }
        observer.next(posts);
        observer.complete();
      }, error => {
        observer.error(error);
        observer.complete();
      })
    });
  }

  formatDate(date: string) {
    return this.datePipe.transform(date, 'yyyy/MM/dd hh:mm') || "";
  }
}
