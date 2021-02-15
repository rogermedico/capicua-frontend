import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-birth-date-dialog',
  templateUrl: './birth-date-dialog.component.html',
  styleUrls: ['./birth-date-dialog.component.scss']
})
export class BirthDateDialogComponent implements OnInit {

  public birthDateDialogForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<BirthDateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { birthDate: Date; }
  ) { }

  ngOnInit(): void {
    this.birthDateDialogForm = this.formBuilder.group({
      birthDate: [this.data.birthDate]
    })
  }

  onCloseDialog(): void {
    this.dialogRef.close();
  }

  submit(): void {
    this.dialogRef.close(this.birthDateDialogForm.value);
  }

}
