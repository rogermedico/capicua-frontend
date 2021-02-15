import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-text-input-dialog',
  templateUrl: './text-input-dialog.component.html',
  styleUrls: ['./text-input-dialog.component.scss']
})
export class TextInputDialogComponent implements OnInit {

  public textDialogForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<TextInputDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string; placeholder: string; currentText: string }
  ) { }

  ngOnInit(): void {
    this.textDialogForm = this.formBuilder.group({
      text: [this.data.currentText, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]]
    })
  }

  onCloseDialog(): void {
    this.dialogRef.close();
  }

  submit(): void {
    this.dialogRef.close(this.textDialogForm.value);
  }

}
