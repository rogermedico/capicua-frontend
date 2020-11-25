import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogoutGuardService } from '@guards/logout-guard.service';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [LogoutGuardService] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
