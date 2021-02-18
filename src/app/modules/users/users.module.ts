import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './components/users/users.component';
import { MaterialModule } from '@modules/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSortModule } from '@angular/material/sort';
import { NewUserComponent } from './components/new-user/new-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { EditUserComponent } from './components/edit/edit-user/edit-user.component';
import { EditProfileComponent } from './components/edit/edit-profile/edit-profile.component';
import { EditCoursesComponent } from './components/edit/edit-courses/edit-courses.component';
import { EditEducationComponent } from './components/edit/edit-education/edit-education.component';
import { EditLanguagesComponent } from './components/edit/edit-languages/edit-languages.component';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { ViewUserComponent } from './components/view/view-user/view-user.component';
import { ViewProfileComponent } from './components/view/view-profile/view-profile.component';
import { ViewCoursesComponent } from './components/view/view-courses/view-courses.component';
import { ViewEducationComponent } from './components/view/view-education/view-education.component';
import { ViewLanguagesComponent } from './components/view/view-languages/view-languages.component';
import { EditProfileDialogComponent } from './components/dialogs/edit-profile-dialog/edit-profile-dialog.component';
import { CourseDialogComponent } from './components/dialogs/course-dialog/course-dialog.component';
import { EducationDialogComponent } from './components/dialogs/education-dialog/education-dialog.component';

@NgModule({
  declarations: [
    UsersComponent,
    NewUserComponent,
    ViewUserComponent,
    ViewProfileComponent,
    ViewCoursesComponent,
    ViewEducationComponent,
    ViewLanguagesComponent,
    EditUserComponent,
    EditProfileComponent,
    EditCoursesComponent,
    EditEducationComponent,
    EditLanguagesComponent,
    ConfirmDialogComponent,
    EditProfileDialogComponent,
    CourseDialogComponent,
    EducationDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UsersRoutingModule,
    MaterialModule,
    MatSortModule,
    MatNativeDateModule,
    FlexLayoutModule
  ]
})
export class UsersModule { }
