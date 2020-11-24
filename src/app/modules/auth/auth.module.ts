import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ReactiveFormsModule } from '@angular/forms';

/* angular material */
import { MaterialModule } from '@modules/material/material.module';

@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    LoginComponent
  ]
})
export class AuthModule { }
