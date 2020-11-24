import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import { LogoutGuardService } from '@guards/logout-guard.service';
import { PersonalDataGuard } from '@guards/personal-data-guard.service';

import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';



const routes: Routes = [
  { path: "dashboard", component: DashboardComponent, canActivate: [LogoutGuardService] },
  { path: "profile", component: ProfileComponent, canActivate: [LogoutGuardService] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [PersonalDataGuard]
})
export class UserRoutingModule { }
