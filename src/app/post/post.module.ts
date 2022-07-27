import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PostComponent} from "./post.component";
import {CreatePostComponent} from "./create-post/create-post.component";
import {SharedModule} from "../shared/shared.module";
import {PostService} from "@app/services/post.service";
import {FullCodeEditorModule} from "@app/code-editor/full-code-editor.module";
import {NgxDropzoneModule} from "ngx-dropzone";
import {AllPostsComponent} from "@app/post/all-posts/all-posts.component";
import { CommentPostComponent } from './comment-post/comment-post.component';



@NgModule({
  declarations: [
    PostComponent,
    CreatePostComponent,
    AllPostsComponent,
    CommentPostComponent
  ],
  exports: [
    PostComponent,
    CreatePostComponent,
    AllPostsComponent,
    CommentPostComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FullCodeEditorModule,
    NgxDropzoneModule
  ],
  providers: [
    PostService
  ]
})
export class PostModule { }
