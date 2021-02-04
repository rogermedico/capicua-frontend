import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import { LogoutGuard } from '@guards/logout.guard';
import { PersonalDataGuard } from '@guards/personal-data-guard.service';

import { UserComponent } from './components/user/user.component';



const routes: Routes = [
  { path: '', component: UserComponent, canActivate: [LogoutGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [PersonalDataGuard]
})
export class UserRoutingModule { }
