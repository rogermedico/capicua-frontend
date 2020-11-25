import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { UserRoutingModule } from "./profile-routing.module";
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    UserRoutingModule,
    ReactiveFormsModule
  ]
})
export class ProfileModule { }
