import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@modules/material/material.module';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditHomePostDialogComponent } from './components/dialogs/edit-home-post-dialog/edit-home-post-dialog.component';


@NgModule({
  declarations: [
    HomeComponent,
    EditHomePostDialogComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatNativeDateModule,
    FlexLayoutModule
  ]
})
export class HomeModule { }
