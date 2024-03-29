import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PostComponent} from "./post.component";
import {CreatePostComponent} from "./create-post/create-post.component";
import {SharedModule} from "../shared/shared.module";
import {PostService} from "@app/services/post.service";
import {FullCodeEditorModule} from "@app/code-editor/full-code-editor.module";
import {NgxDropzoneModule} from "ngx-dropzone";
import {AllPostsComponent} from "@app/post/all-posts/all-posts.component";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import { CommentPostComponent } from './all-comments-by-post/comment-post/comment-post.component';
import { AllCommentsByPostComponent } from './all-comments-by-post/all-comments-by-post.component';
import { ProfilePostComponent } from './profile-post/profile-post.component';



@NgModule({
  declarations: [
    PostComponent,
    CreatePostComponent,
    AllPostsComponent,
    CommentPostComponent,
    AllCommentsByPostComponent,
    ProfilePostComponent
  ],
    exports: [
        PostComponent,
        CreatePostComponent,
        AllPostsComponent,
        CommentPostComponent,
        AllCommentsByPostComponent,
        ProfilePostComponent
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
