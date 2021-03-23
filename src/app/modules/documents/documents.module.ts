import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentsRoutingModule } from './documents-routing.module';
import { DocumentsComponent } from './components/documents/documents.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@modules/material/material.module';
import { MatNativeDateModule } from '@angular/material/core';


@NgModule({
  declarations: [DocumentsComponent],
  imports: [
    CommonModule,
    DocumentsRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    MatNativeDateModule
  ]
})
export class DocumentsModule { }
