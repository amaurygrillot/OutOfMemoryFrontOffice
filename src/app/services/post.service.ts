import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Post} from "../shared/models";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {SharedComponent} from "../shared/shared.component";

@Injectable()
export class PostService {

  private _URL = "https://outofmemoryerror-back.azurewebsites.net"
  private _API_URL = `${this._URL}/api`

  header = new HttpHeaders()
    .set('Authorization', `${sessionStorage.getItem('token')}`)
    .set('Content-Type', 'application/json');

  constructor(private http: HttpClient, private sharedComponent: SharedComponent) { }

  getAllPosts() {
    return new Observable<Post[]>((observer) => {
      this.http.get(`${this._API_URL}/post/getAllPosts`).subscribe((results: any) => {
        const posts = [];
        for (const result of results.posts) {
          const post = new Post(
            result.post_uid,
            result.is_comment,
            result.type_privacy,
            result.title,
            result.description,
            this.sharedComponent.formatDate(result.created_at),
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

  getPostsByUserId(userId: string) {
    return new Observable<Post[]>((observer) => {
      // @ts-ignore
      const body = new HttpParams().set("idPerson", userId);
      this.http.get(`${this._API_URL}/post/getPostByIdPerson`,  { headers : this.header, params: body}).subscribe((results: any) => {
        const posts = [];
        for (const result of results.post) {
          const post = new Post(
            result.post_uid,
            result.is_comment,
            result.type_privacy,
            result.title,
            result.description,
            this.sharedComponent.formatDate(result.created_at),
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
}
