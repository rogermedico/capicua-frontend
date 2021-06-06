import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyDocumentsRoutingModule } from './my-documents-routing.module';
import { MyDocumentsComponent } from './components/my-documents/my-documents.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatNativeDateModule } from '@angular/material/core';
import { MaterialModule } from '@modules/material/material.module';


@NgModule({
  declarations: [
    MyDocumentsComponent
  ],
  imports: [
    CommonModule,
    MyDocumentsRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    MatNativeDateModule
  ]
})
export class MyDocumentsModule { }
