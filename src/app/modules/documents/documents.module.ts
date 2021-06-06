import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentsRoutingModule } from './documents-routing.module';
import { DocumentsComponent } from './components/documents/documents.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@modules/material/material.module';
import { MatNativeDateModule } from '@angular/material/core';
import { ViewDocumentsComponent } from './components/view-documents/view-documents.component';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';


@NgModule({
  declarations: [
    DocumentsComponent,
    ViewDocumentsComponent,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    DocumentsRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    MatNativeDateModule
  ]
})
export class DocumentsModule { }
