import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FullCodeEditorComponent} from "./full-code-editor.component";
import {SharedModule} from "../shared/shared.module";
import {CodeEditorModule} from "@ngstack/code-editor";


@NgModule({
  declarations: [
    FullCodeEditorComponent
  ],
  exports: [
    FullCodeEditorComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CodeEditorModule.forRoot(),
  ]
})
export class FullCodeEditorModule { }
