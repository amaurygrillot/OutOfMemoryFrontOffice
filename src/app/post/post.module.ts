import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PostComponent} from "./post.component";
import {CreatePostComponent} from "./create-post/create-post.component";
import {SharedModule} from "../shared/shared.module";
import {PostService} from "@app/services/post.service";
import {FullCodeEditorModule} from "@app/code-editor/full-code-editor.module";
import {NgxDropzoneModule} from "ngx-dropzone";
import {AllPostsComponent} from "@app/post/all-posts/all-posts.component";
import { LikePostComponent } from './like-post/like-post.component';
import { CommentPostComponent } from './comment-post/comment-post.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";



@NgModule({
  declarations: [
    PostComponent,
    CreatePostComponent,
    AllPostsComponent,
    LikePostComponent,
    CommentPostComponent
  ],
  exports: [
    PostComponent,
    CreatePostComponent,
    AllPostsComponent,
    LikePostComponent,
    CommentPostComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FullCodeEditorModule,
    NgxDropzoneModule,
    MatAutocompleteModule
  ],
  providers: [
    PostService
  ]
})
export class PostModule { }
