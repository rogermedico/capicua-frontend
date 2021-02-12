import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogoutGuard } from '@guards/logout.guard';
import { EditUserComponent } from './components/edit/edit-user/edit-user.component';
import { NewUserComponent } from './components/new-user/new-user.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  { path: '', component: UsersComponent, canActivate: [LogoutGuard] },
  { path: 'new', component: NewUserComponent, canActivate: [LogoutGuard] },
  { path: 'edit/:id', component: EditUserComponent, canActivate: [LogoutGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
