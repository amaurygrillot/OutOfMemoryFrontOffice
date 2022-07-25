import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Post} from "../shared/models";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {SharedComponent} from "../shared/shared.component";
import {CodeModel} from "@ngstack/code-editor";

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

  createNewPost(file: File, title: string, description: string) {
    const formData = new FormData();
    formData.append('imagePosts', file);
    formData.append('type_privacy', '1');
    formData.append('title', title);
    formData.append('description', description);

    const createPostHeader = new HttpHeaders()
      .set('Authorization', `${sessionStorage.getItem('token')}`)
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
}
