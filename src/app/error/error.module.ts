import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PageEmptyComponent } from './components/page-empty/page-empty.component';



@NgModule({
  declarations: [
    PageNotFoundComponent,
    PageEmptyComponent
  ],
  exports: [
    PageEmptyComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ErrorModule { }
