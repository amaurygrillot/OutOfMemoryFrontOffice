import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PostComponent} from "./post.component";
import {CreatePostComponent} from "./create-post/create-post.component";
import {SharedModule} from "../shared/shared.module";
import {PostService} from "@app/services/post.service";



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
    SharedModule
  ],
  providers: [
    PostService
  ]
})
export class PostModule { }
