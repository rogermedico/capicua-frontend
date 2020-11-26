import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogoutGuardService } from '@guards/logout-guard.service';
import { MyDocsComponent } from './components/my-docs/my-docs.component';

const routes: Routes = [
  { path: '', component: MyDocsComponent, canActivate: [LogoutGuardService] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyDocsRoutingModule { }
