import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as UserSelectors from '@modules/user/store/user.selector';
import { UserState } from '@modules/user/store/user.state';
import { Store } from '@ngrx/store';
import * as AppConstantsSelectors from '@store/app-constants/app-constants.selector';
import { AppState } from '@store/root.state';
import { Observable, Subscription } from 'rxjs';
import { filter, map, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-education-dialog',
  templateUrl: './education-dialog.component.html',
  styleUrls: ['./education-dialog.component.scss']
})
export class EducationDialogComponent implements OnInit {

  public userState$: Observable<UserState> = this.store$.select(UserSelectors.selectUserState);
  public educationDialogForm: FormGroup;
  public finishDateSubscription: Subscription;

  constructor(
    private store$: Store<AppState>,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EducationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      name: string;
      finishDate: Date;
      finished: boolean;
    } | null
  ) { }

  ngOnInit(): void {

    this.educationDialogForm = this.formBuilder.group({
      name: [this.data ? this.data.name : null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(70),
      ]
      ],
      finishDate: [this.data ? this.data.finishDate : null],
      finished: [this.data ? this.data.finished : null],

    })

    this.finishDateSubscription = this.educationDialogForm.get('finishDate').valueChanges.pipe(
      tap(finishDate => {
        if (finishDate || this.finishDate.invalid) this.finished.disable();
        else this.finished.enable();
      })
    ).subscribe();

  }

  ngOnDestroy() {
    this.finishDateSubscription.unsubscribe();
  }

  onCloseDialog(): void {
    this.dialogRef.close();
  }

  submit(): void {

    this.dialogRef.close({
      name: this.name.value,
      finishDate: this.finishDate.value,
      finished: this.finishDate.value ? true : this.finished.value
    });
  }

  get name() { return this.educationDialogForm.get('name') }
  get finishDate() { return this.educationDialogForm.get('finishDate') }
  get finished() { return this.educationDialogForm.get('finished') }

}
