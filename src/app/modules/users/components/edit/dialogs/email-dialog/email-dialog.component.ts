import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DniDialogComponent } from '../dni-dialog/dni-dialog.component';

@Component({
  selector: 'app-email-dialog',
  templateUrl: './email-dialog.component.html',
  styleUrls: ['./email-dialog.component.scss']
})
export class EmailDialogComponent implements OnInit {

  public emailDialogForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DniDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { email: string; }
  ) { }

  ngOnInit(): void {
    this.emailDialogForm = this.formBuilder.group({
      email: [this.data.email, [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
      ]]
    })
  }

  onCloseDialog(): void {
    this.dialogRef.close();
  }

  submit(): void {
    this.dialogRef.close(this.emailDialogForm.value);
  }

}
