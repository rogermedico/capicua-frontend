import { Component, Inject, OnInit } from '@angular/core';
import { UserType } from '@models/user-type.model';
import { UserState } from '@modules/user/store/user.state';
import { combineLatest, Observable, Subscription } from 'rxjs';
import * as UserSelectors from '@modules/user/store/user.selector';
import * as AppConstantsSelectors from '@store/app-constants/app-constants.selector';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '@store/root.state';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditProfileDialogComponent } from '../edit-profile-dialog/edit-profile-dialog.component';
import { filter, map, take } from 'rxjs/operators';
import { userTypeValidator } from '@validators/userType.validator';
import { CourseType } from '@models/course.model';

@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.scss']
})
export class CourseDialogComponent implements OnInit {

  public userState$: Observable<UserState> = this.store$.select(UserSelectors.selectUserState);
  public courseTypes$: Observable<CourseType[]> = this.store$.select(AppConstantsSelectors.selectCourseTypes);
  public combinedUserUserTypesStateSubscription: Subscription;
  public courseTypes: CourseType[];
  public courseDialogForm: FormGroup;

  constructor(
    private store$: Store<AppState>,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      courseId: number;
      number: string;
      expeditionDate: Date;
      validUntil: Date;
      coursesAlreadyAdded: number[];
    }
  ) { }

  ngOnInit(): void {

    this.combinedUserUserTypesStateSubscription = this.courseTypes$.pipe(
      filter(courseTypes => courseTypes != null),
      take(1),
      map(courseTypes => {
        if (this.data.coursesAlreadyAdded) this.courseTypes = courseTypes.filter(ct => !this.data.coursesAlreadyAdded.includes(ct.id));
        else this.courseTypes = courseTypes;
      })
    ).subscribe();


    this.courseDialogForm = this.formBuilder.group({
      courseId: [
        {
          value: this.data.courseId ? this.data.courseId : null,
          disabled: this.data.courseId ? true : false
        },
        [
          Validators.required
        ]
      ],
      number: [this.data.number ? this.data.number : null, [
        Validators.minLength(3),
        Validators.maxLength(55)
      ]],
      expeditionDate: [this.data.expeditionDate ? this.data.expeditionDate : null],
      validUntil: [this.data.validUntil ? this.data.validUntil : null],

    })
  }

  ngOnDestroy() {
    this.combinedUserUserTypesStateSubscription.unsubscribe();
  }

  onCloseDialog(): void {
    this.dialogRef.close();
  }

  submit(): void {

    this.dialogRef.close({
      courseId: this.courseId.value ? this.courseId.value : this.data.courseId,
      number: this.number.value,
      expeditionDate: this.expeditionDate.value,
      validUntil: this.validUntil.value
    });
  }

  get courseId() { return this.courseDialogForm.get('courseId') }
  get number() { return this.courseDialogForm.get('number') }
  get expeditionDate() { return this.courseDialogForm.get('expeditionDate') }
  get validUntil() { return this.courseDialogForm.get('validUntil') }

}
