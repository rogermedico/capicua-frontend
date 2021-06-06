import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HomePostSend } from '@models/home-post.model';

@Component({
  selector: 'app-edit-home-post-dialog',
  templateUrl: './edit-home-post-dialog.component.html',
  styleUrls: ['./edit-home-post-dialog.component.scss']
})
export class EditHomePostDialogComponent implements OnInit {

  public editHomePostForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditHomePostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      title: string;
      body: string
    }
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {

    const paragraphReplace = {
      '<p>': '',
      '</p>': '\n'
    }

    this.editHomePostForm = this.fb.group({
      title: [
        this.data.title,
        [
          Validators.required,
          Validators.maxLength(200)
        ]
      ],
      body: [
        this.data.body.replace(/<p>|<\/p>/g, function (matched) {
          return paragraphReplace[matched];
        }),
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
    const editHomePost: HomePostSend = this.editHomePostForm.value;
    editHomePost.body.replace(/\n/g, '\\n');
    this.dialogRef.close(editHomePost);
  }

}