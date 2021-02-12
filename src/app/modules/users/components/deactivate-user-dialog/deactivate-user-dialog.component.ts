import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-deactivate-user-dialog',
  templateUrl: './deactivate-user-dialog.component.html',
  styleUrls: ['./deactivate-user-dialog.component.scss']
})
export class DeactivateUserDialogComponent implements OnInit {


  constructor(
    public dialogRef: MatDialogRef<DeactivateUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string; surname: string }
  ) { }

  ngOnInit(): void {
  }

}