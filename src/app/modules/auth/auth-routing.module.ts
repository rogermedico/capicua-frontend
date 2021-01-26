import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuardService } from '@guards/login-guard.service';
import { LogoutGuardService } from '@guards/logout-guard.service';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';

const routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: "full" },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuardService] },
  // { path: "register", component: RegisterComponent, canActivate: [LoginGuardService] },
  { path: "logout", component: LogoutComponent, canActivate: [LogoutGuardService] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
