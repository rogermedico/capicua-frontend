import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogoutGuard } from '@guards/logout.guard';
import { MyDocsComponent } from './components/my-docs/my-docs.component';

const routes: Routes = [
  { path: '', component: MyDocsComponent, canActivate: [LogoutGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyDocsRoutingModule { }
