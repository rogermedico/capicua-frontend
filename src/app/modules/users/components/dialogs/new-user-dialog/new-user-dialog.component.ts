import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersState } from '@modules/users/store/users.state';
import { Store } from '@ngrx/store';
import { AppState } from '@store/root.state';
import * as UsersSelectors from '@modules/users/store/users.selector';
import * as UserSelectors from '@modules/user/store/user.selector';
import * as AppConstantsSelectors from '@store/app-constants/app-constants.selector';
import { combineLatest, Observable, Subscriber, Subscription } from 'rxjs';
import { userTypeValidator } from '@validators/userType.validator';
import { UserState } from '@modules/user/store/user.state';
import { filter, map, take } from 'rxjs/operators';
import { UserType } from '@models/user-type.model';
import { NewUser } from '@models/user.model';
import { PasswordGeneratorService } from '@services/password-generator.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-user-dialog',
  templateUrl: './new-user-dialog.component.html',
  styleUrls: ['./new-user-dialog.component.scss']
})
export class NewUserDialogComponent implements OnInit, OnDestroy {

  public newUserForm: FormGroup;
  public usersState$: Observable<UsersState> = this.store$.select(UsersSelectors.selectUsersState);
  public userState$: Observable<UserState> = this.store$.select(UserSelectors.selectUserState);
  public userTypes$: Observable<UserType[]> = this.store$.select(AppConstantsSelectors.selectUserTypes);
  public combinedUserUserTypesStateSubscription: Subscription;
  public usersStateSubscription: Subscription;
  public userTypes: UserType[];

  constructor(
    private store$: Store<AppState>,
    private fb: FormBuilder,
    private passwordGenerator: PasswordGeneratorService,
    public dialogRef: MatDialogRef<NewUserDialogComponent>,
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
    if (this.usersStateSubscription) this.usersStateSubscription.unsubscribe();
  }

  createForm() {
    this.newUserForm = this.fb.group({
      name: [null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(55)
      ]],
      surname: [null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(55)
      ]],
      email: [null, [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
      ]],
      userTypeId: [null, [
        Validators.required,
        userTypeValidator
      ]],
    });

  }

  onCloseDialog(): void {
    this.dialogRef.close();
  }

  submit(): void {
    const newUser: NewUser = {
      name: this.name.value,
      surname: this.surname.value,
      email: this.email.value,
      user_type_id: this.userTypeId.value,
      password: this.passwordGenerator.generate(),
    }
    this.dialogRef.close(newUser);
  }

  get name() { return this.newUserForm.get('name'); }

  get surname() { return this.newUserForm.get('surname'); }

  get email() { return this.newUserForm.get('email'); }

  get userTypeId() { return this.newUserForm.get('userTypeId'); }

}