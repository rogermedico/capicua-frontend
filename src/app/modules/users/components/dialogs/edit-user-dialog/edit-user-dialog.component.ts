import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserType } from '@models/user-type.model';
import { UserState } from '@modules/user/store/user.state';
import { UsersState } from '@modules/users/store/users.state';
import { combineLatest, Observable, Subscription } from 'rxjs';
import * as UsersSelectors from '@modules/users/store/users.selector';
import * as UserSelectors from '@modules/user/store/user.selector';
import * as AppConstantsSelectors from '@store/app-constants/app-constants.selector';
import { Store } from '@ngrx/store';
import { AppState } from '@store/root.state';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { filter, map, take } from 'rxjs/operators';
import { userTypeValidator } from '@validators/userType.validator';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.scss']
})
export class EditUserDialogComponent implements OnInit {

  public editUserForm: FormGroup;
  public usersState$: Observable<UsersState> = this.store$.select(UsersSelectors.selectUsersState);
  public userState$: Observable<UserState> = this.store$.select(UserSelectors.selectUserState);
  public userTypes$: Observable<UserType[]> = this.store$.select(AppConstantsSelectors.selectUserTypes);
  public combinedUserUserTypesStateSubscription: Subscription;
  public userTypes: UserType[];

  constructor(
    private store$: Store<AppState>,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      userTypeId: number;
      actualPosition: string
    }
  ) { }

  ngOnInit(): void {

    this.combinedUserUserTypesStateSubscription = combineLatest([this.userState$, this.userTypes$]).pipe(
      filter(([userState, userTypes]) => {
        return userState.user != null && userTypes != null;
      }),
      take(1),
      map(([userState, userTypes]) => {
        this.userTypes = userTypes.filter(ut => {
          if (userState.user.userType.rank != ut.rank) return ut;
        })
      })
    ).subscribe();

    this.createForm();
  }

  ngOnDestroy(): void {
    this.combinedUserUserTypesStateSubscription.unsubscribe();
  }

  createForm() {
    this.editUserForm = this.fb.group({
      userTypeId: [{
        value: this.data.userTypeId,
        disabled: this.data.userTypeId == 1
      },
      [
        userTypeValidator
      ]],
      actualPosition: [this.data.actualPosition, [
        Validators.maxLength(100),
      ]]
    });

  }

  onCloseDialog(): void {
    this.dialogRef.close();
  }

  submit(): void {
    this.dialogRef.close(this.editUserForm.value);
  }

}