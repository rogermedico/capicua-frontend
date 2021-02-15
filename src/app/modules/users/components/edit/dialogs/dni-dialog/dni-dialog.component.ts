import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { dniValidator } from '@validators/dni.validator';

@Component({
  selector: 'app-dni-dialog',
  templateUrl: './dni-dialog.component.html',
  styleUrls: ['./dni-dialog.component.scss']
})
export class DniDialogComponent implements OnInit {

  public dniDialogForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DniDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { dni: string; }
  ) { }

  ngOnInit(): void {
    this.dniDialogForm = this.formBuilder.group({
      dni: [this.data.dni, [
        Validators.required,
        dniValidator
      ]]
    })
  }

  onCloseDialog(): void {
    this.dialogRef.close();
  }

  submit(): void {
    this.dialogRef.close(this.dniDialogForm.value);
  }

}
