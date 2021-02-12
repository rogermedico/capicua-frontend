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
import { DeactivateUserDialogComponent } from './components/deactivate-user-dialog/deactivate-user-dialog.component';


@NgModule({
  declarations: [
    UsersComponent,
    NewUserComponent,
    NewUserComponent,
    EditUserComponent,
    EditProfileComponent,
    EditCoursesComponent,
    EditEducationComponent,
    EditLanguagesComponent,
    DeactivateUserDialogComponent
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
