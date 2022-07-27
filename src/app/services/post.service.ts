import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Post, User, Comment} from "../shared/models";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {SharedComponent} from "../shared/shared.component";
import {CodeModel} from "@ngstack/code-editor";

@Injectable()
export class PostService {

  private _URL = "https://outofmemoryerror-back.azurewebsites.net"
  private _API_URL = `${this._URL}/api`
  private _token = sessionStorage.getItem('token')

  header = new HttpHeaders()
    .set('Authorization', `${this._token}`)
    .set('Content-Type', 'application/json');

  reqPostHeader = new HttpHeaders()
    .set('Authorization', `${this._token}`)
    .set('Accept', 'application/json')

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

  createNewPost(file: File, title: string, description: string) {
    const formData = new FormData();
    formData.append('imagePosts', file);
    formData.append('type_privacy', '1');
    formData.append('title', title);
    formData.append('description', description);

    const createPostHeader = new HttpHeaders()
      .set('Authorization', `${this._token}`)
      .set('enctype', 'multipart/form-data')
      .set('Accept', 'application/json')

    return this.http.post<any>(`${this._API_URL}/post/createNewPost`, formData, { headers: createPostHeader });

  }

  async saveCode(post_uid: string, codeModel: CodeModel): Promise<string | undefined>
  {
    let file = new Blob([ codeModel.value],
      {type:  codeModel.uri.substring(codeModel.uri.indexOf('.'))});
    const formData: FormData = new FormData();
    formData.append('fileKey', file, codeModel.uri);
    formData.append('commentId', `${post_uid}`)
    const headers1 = new HttpHeaders()
      .set('Authorization', `${sessionStorage.getItem('token')}`)

    return this.http.post<string>(`https://outofmemoryerror-code-executer-container.azurewebsites.net/${codeModel.language}/saveFile`,
      formData,
      { headers: headers1}
    ).toPromise();
  }

  getLikes(post_uid: string) {
    const body = new HttpParams().set('uidPost', post_uid)
    return new Observable<bigint>((observer) => {
      this.http.get(`${this._API_URL}/post/getLikes`, { headers : this.header, params: body}).subscribe(async (result: any) => {
        const likes = result.posts[0][0].uid_likes;
        console.log("post likes", post_uid, likes);
        observer.next(likes);
        observer.complete();
      }, error => {
        observer.error(error);
        observer.complete();
      })
    });
  }

  likeOrUnlikePost(post_uid: string, user_uid: string) {
    const body = {
      'uidPost': post_uid,
      'uidPerson': user_uid
    }
    return this.http.post<any>(`${this._API_URL}/post/likeOrUnlikePost`, body, { headers: this.header });
  }

  createNewComment(post_uid: string, comment: string) {
    const body = {
      'uidPost': post_uid,
      'comment': comment
    }
    return this.http.post<any>(`${this._API_URL}/post/addNewComment`, body, { headers: this.header});
  }

  getCommentsByPostId(post_uid: string) {
    return new Observable<Comment[]>((observer) => {
      this.http.get(`${this._API_URL}/post/getCommentByIdPost/${post_uid}`, { headers: this.header }).subscribe((results: any) => {
        const comments = [];
        for (const result of results.comments) {
          console.log(result.uid, result.comment)
          const comment = new Comment(
            result.uid,
            result.comment,
            result.is_like,
            this.sharedComponent.formatDate(result.created_at),
            result.person_uid,
            result.post_uid,
            result.username,
            result.avatar
          );
          comments.push(comment);
        }
        // slice(1) to remove first default comment
        observer.next(comments.slice(1));
        observer.complete();
      }, error => {
        observer.error(error);
        observer.complete();
      })
    });
  }
}
