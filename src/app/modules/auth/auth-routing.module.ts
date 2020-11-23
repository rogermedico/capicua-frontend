import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuardService } from '@guards/login-guard.service';
import { LogoutGuardService } from '@guards/logout-guard.service';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [
  { path: "login", component: LoginComponent, canActivate: [LoginGuardService] },
  // { path: "register", component: RegisterComponent, canActivate: [LoginGuardService] },
  { path: "logout", component: LogoutComponent, canActivate: [LogoutGuardService] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
