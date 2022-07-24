import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PostComponent} from "./post.component";
import {CreatePostComponent} from "./create-post/create-post.component";
import {SharedModule} from "../shared/shared.module";
import {PostService} from "@app/services/post.service";
import {FullCodeEditorModule} from "@app/code-editor/full-code-editor.module";



@NgModule({
  declarations: [
    PostComponent,
    CreatePostComponent
  ],
  exports: [
    PostComponent,
    CreatePostComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FullCodeEditorModule
  ],
  providers: [
    PostService
  ]
})
export class PostModule { }
