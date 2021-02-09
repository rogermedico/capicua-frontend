import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { UserRoutingModule } from "./user-routing.module";
import { UserComponent } from './components/user/user.component';
import { MaterialModule } from "@modules/material/material.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ProfileComponent } from './components/profile/profile.component';
import { CoursesComponent } from './components/courses/courses.component';
import { EducationComponent } from './components/education/education.component';
import { LanguagesComponent } from './components/languages/languages.component';

@NgModule({
  declarations: [
    UserComponent,
    ProfileComponent,
    CoursesComponent,
    EducationComponent,
    LanguagesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    UserRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule
  ]
})
export class UserModule { }
