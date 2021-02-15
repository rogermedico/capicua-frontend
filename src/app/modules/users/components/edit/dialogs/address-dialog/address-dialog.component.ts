import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-address-dialog',
  templateUrl: './address-dialog.component.html',
  styleUrls: ['./address-dialog.component.scss']
})
export class AddressDialogComponent implements OnInit {

  public addressDialogForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddressDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { number: string; street: string }
  ) { }

  ngOnInit(): void {
    this.addressDialogForm = this.formBuilder.group({
      number: [this.data.number, [
        Validators.required,
        Validators.maxLength(10)
      ]],
      street: [this.data.street, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]],
    })
  }

  onCloseDialog(): void {
    this.dialogRef.close();
  }

  submit(): void {
    this.dialogRef.close(this.addressDialogForm.value);
  }

}
