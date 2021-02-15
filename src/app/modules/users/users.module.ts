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
import { ViewUserComponent } from './components/view/view-user/view-user.component';
import { ViewProfileComponent } from './components/view/view-profile/view-profile.component';
import { ViewCoursesComponent } from './components/view/view-courses/view-courses.component';
import { ViewEducationComponent } from './components/view/view-education/view-education.component';
import { ViewLanguagesComponent } from './components/view/view-languages/view-languages.component';
import { TextInputDialogComponent } from './components/edit/dialogs/text-input-dialog/text-input-dialog.component';
import { EmailDialogComponent } from './components/edit/dialogs/email-dialog/email-dialog.component';
import { BirthDateDialogComponent } from './components/edit/dialogs/birth-date-dialog/birth-date-dialog.component';
import { DniDialogComponent } from './components/edit/dialogs/dni-dialog/dni-dialog.component';
import { DrivingLicencesDialogComponent } from './components/edit/dialogs/driving-licences-dialog/driving-licences-dialog.component';
import { AddressDialogComponent } from './components/edit/dialogs/address-dialog/address-dialog.component';


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
    DeactivateUserDialogComponent,
    TextInputDialogComponent,
    EmailDialogComponent,
    BirthDateDialogComponent,
    DniDialogComponent,
    DrivingLicencesDialogComponent,
    AddressDialogComponent,
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
