import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CreatePostComponent} from "./create-post/create-post.component";
import {ImageSenderComponent} from "./create-post/image-sender/image-sender.component";
import {SharedModule} from "../shared/shared.module";
import {PostService} from "@app/services/post.service";
import {UserService} from "@app/services/user.service";
import {PostComponent} from "@app/post/post.component";
import {FullCodeEditorModule} from "@app/code-editor/full-code-editor.module";



@NgModule({
  declarations: [
    CreatePostComponent,
    ImageSenderComponent,
    PostComponent
  ],
  providers: [
    PostService,
    UserService
  ],
  imports: [
    CommonModule,
    SharedModule,
    FullCodeEditorModule
  ],
  exports: [
    PostComponent,
    CreatePostComponent
  ]
})
export class PostModule { }
