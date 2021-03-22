import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogoutGuard } from '@guards/logout.guard';
import { MyDocumentsComponent } from './components/my-documents/my-documents.component';

const routes: Routes = [
  { path: '', component: MyDocumentsComponent, canActivate: [LogoutGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyDocumentsRoutingModule { }
