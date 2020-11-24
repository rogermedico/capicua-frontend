import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: "full" },
  {
    path: 'auth',
    loadChildren: () => import("./modules/auth/auth.module").then((m) => m.AuthModule),
  },
  {
    path: 'user',
    loadChildren: () => import("./modules/user/user.module").then((m) => m.UserModule),
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
