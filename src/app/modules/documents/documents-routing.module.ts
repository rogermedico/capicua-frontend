import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogoutGuard } from '@guards/logout.guard';
import { DocumentsComponent } from '@modules/documents/components/documents/documents.component';

const routes: Routes = [
  { path: '', component: DocumentsComponent, canActivate: [LogoutGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentsRoutingModule { }
