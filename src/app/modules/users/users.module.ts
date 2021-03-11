import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './components/users/users.component';
import { MaterialModule } from '@modules/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSortModule } from '@angular/material/sort';
import { NewUserDialogComponent } from './components/dialogs/new-user-dialog/new-user-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { ViewUserComponent } from './components/view/view-user/view-user.component';
import { ViewProfileComponent } from './components/view/view-profile/view-profile.component';
import { ViewCoursesComponent } from './components/view/view-courses/view-courses.component';
import { ViewEducationComponent } from './components/view/view-education/view-education.component';
import { ViewLanguagesComponent } from './components/view/view-languages/view-languages.component';
import { EditUserDialogComponent } from './components/dialogs/edit-user-dialog/edit-user-dialog.component';
import { ViewDocumentsComponent } from './components/view/view-documents/view-documents.component';

@NgModule({
  declarations: [
    UsersComponent,
    ViewUserComponent,
    ViewProfileComponent,
    ViewCoursesComponent,
    ViewEducationComponent,
    ViewLanguagesComponent,
    ConfirmDialogComponent,
    NewUserDialogComponent,
    EditUserDialogComponent,
    ViewDocumentsComponent
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
