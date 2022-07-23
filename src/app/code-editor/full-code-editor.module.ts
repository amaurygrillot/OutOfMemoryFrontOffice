import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FullCodeEditorComponent} from "./full-code-editor.component";
import {SharedModule} from "../shared/shared.module";
import {CodeEditorModule} from "@ngstack/code-editor";



@NgModule({
  declarations: [
    FullCodeEditorComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CodeEditorModule.forRoot()
  ],
  exports: [
    FullCodeEditorComponent
  ]
})
export class FullCodeEditorModule { }
