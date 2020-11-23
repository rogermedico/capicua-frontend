import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import { LogoutGuardService } from '@guards/logout-guard.service';
import { PersonalDataGuard } from '@guards/personal-data-guard.service';

import { ProfileComponent } from './components/profile/profile.component';
import { EducationCrudComponent } from './components/education-crud/education-crud.component';
import { LanguageCrudComponent } from './components/language-crud/language-crud.component';



const routes: Routes = [
  { path: "profile", component: ProfileComponent, canActivate: [LogoutGuardService], canDeactivate: [PersonalDataGuard] },
  { path: "education", component: EducationCrudComponent, canActivate: [LogoutGuardService] },
  { path: "education/:id", component: EducationCrudComponent, canActivate: [LogoutGuardService] },
  { path: "language", component: LanguageCrudComponent, canActivate: [LogoutGuardService] },
  { path: "language/:id", component: LanguageCrudComponent, canActivate: [LogoutGuardService] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [PersonalDataGuard]
})
export class UserRoutingModule { }
