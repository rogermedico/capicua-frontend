import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IbanPipe } from '@pipes/iban.pipe';

@NgModule({
  declarations: [
    IbanPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    IbanPipe
  ]
})
export class SharedModule { }
