import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogoutGuardService } from '@guards/logout-guard.service';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';

const routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: "full" },
  {
    path: 'auth',
    loadChildren: () => import("./modules/auth/auth.module").then((m) => m.AuthModule),
  },
  {
    path: 'home',
    loadChildren: () => import("./modules/home/home.module").then((m) => m.HomeModule),
  },
  {
    path: 'mydocs',
    loadChildren: () => import("./modules/my-docs/my-docs.module").then((m) => m.MyDocsModule),
  },
  {
    path: 'user',
    loadChildren: () => import("./modules/user/user.module").then((m) => m.UserModule),
  },
  {
    path: 'users',
    loadChildren: () => import("./modules/users/users.module").then((m) => m.UsersModule),
  },
  { path: 'verify-email', component: VerifyEmailComponent, canActivate: [LogoutGuardService] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
