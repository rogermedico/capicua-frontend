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
import { EditProfileDialogComponent } from "@modules/user/components/dialogs/edit-profile-dialog/edit-profile-dialog.component";
import { MatNativeDateModule } from "@angular/material/core";

@NgModule({
  declarations: [
    UserComponent,
    ProfileComponent,
    CoursesComponent,
    EducationComponent,
    LanguagesComponent,
    EditProfileDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    UserRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    MatNativeDateModule
  ]
})
export class UserModule { }
