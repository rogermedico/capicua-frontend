import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyDocsRoutingModule } from './my-docs-routing.module';
import { MyDocsComponent } from './components/my-docs/my-docs.component';


@NgModule({
  declarations: [MyDocsComponent],
  imports: [
    CommonModule,
    MyDocsRoutingModule
  ]
})
export class MyDocsModule { }
