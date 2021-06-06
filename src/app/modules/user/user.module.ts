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
import { CourseDialogComponent } from "./components/dialogs/course-dialog/course-dialog.component";
import { ConfirmDialogComponent } from "./components/dialogs/confirm-dialog/confirm-dialog.component";
import { EducationDialogComponent } from "./components/dialogs/education-dialog/education-dialog.component";
import { LanguageDialogComponent } from "./components/dialogs/language-dialog/language-dialog.component";
import { UserDocumentsComponent } from './components/user-documents/user-documents.component';
import { SharedModule } from "app/shared.module";

@NgModule({
  declarations: [
    UserComponent,
    ProfileComponent,
    CoursesComponent,
    EducationComponent,
    LanguagesComponent,
    ConfirmDialogComponent,
    EditProfileDialogComponent,
    CourseDialogComponent,
    EducationDialogComponent,
    LanguageDialogComponent,
    UserDocumentsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    UserRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    MatNativeDateModule,
    SharedModule
  ]
})
export class UserModule { }
