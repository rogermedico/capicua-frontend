import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { HomePostSend } from '@models/home-post.model';

@Component({
  selector: 'app-new-home-post-dialog',
  templateUrl: './new-home-post-dialog.component.html',
  styleUrls: ['./new-home-post-dialog.component.scss']
})
export class NewHomePostDialogComponent implements OnInit {

  public newHomePostForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<NewHomePostDialogComponent>,
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.newHomePostForm = this.fb.group({
      title: [
        null,
        [
          Validators.required,
          Validators.maxLength(200)
        ]
      ],
      body: [
        null,
        [
          Validators.required,
        ]
      ]
    });
  }

  onCloseDialog(): void {
    this.dialogRef.close();
  }

  submit(): void {
    const newHomePost: HomePostSend = this.newHomePostForm.value;
    newHomePost.body.replace(/\n/g, '\\n');
    this.dialogRef.close(newHomePost);
  }

}