import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogoutGuard } from '@guards/logout.guard';
import { EmailNotVerifiedComponent } from './components/email-not-verified/email-not-verified.component';

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
    path: 'mydocuments',
    loadChildren: () => import("./modules/my-documents/my-documents.module").then((m) => m.MyDocumentsModule),
  },
  {
    path: 'user',
    loadChildren: () => import("./modules/user/user.module").then((m) => m.UserModule),
  },
  {
    path: 'users',
    loadChildren: () => import("./modules/users/users.module").then((m) => m.UsersModule),
  },
  {
    path: 'documents',
    loadChildren: () => import("./modules/documents/documents.module").then((m) => m.DocumentsModule),
  },
  {
    path: 'configuration',
    loadChildren: () => import("./modules/configuration/configuration.module").then((m) => m.ConfigurationModule),
  },
  { path: 'verify-email', component: EmailNotVerifiedComponent, canActivate: [LogoutGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
