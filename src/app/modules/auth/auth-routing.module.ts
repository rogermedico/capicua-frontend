import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuardService } from '@guards/login-guard.service';
import { LogoutGuardService } from '@guards/logout-guard.service';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: "full" },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuardService] },
  // { path: "register", component: RegisterComponent, canActivate: [LoginGuardService] },
  { path: 'logout', component: LogoutComponent, canActivate: [LogoutGuardService] },
  { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [LoginGuardService] },
  { path: 'reset-password/:token', component: ResetPasswordComponent, canActivate: [LoginGuardService] },
  { path: 'verify-email/:id/:hash', component: VerifyEmailComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
