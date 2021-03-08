import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogoutGuard } from '@guards/logout.guard';
import { UsersComponent } from './components/users/users.component';
import { ViewUserComponent } from './components/view/view-user/view-user.component';

const routes: Routes = [
  { path: '', component: UsersComponent, canActivate: [LogoutGuard] },
  { path: ':id', component: ViewUserComponent, canActivate: [LogoutGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
