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
import { HomePostSend } from '@models/home-post.model';

@Component({
  selector: 'app-edit-home-post-dialog',
  templateUrl: './edit-home-post-dialog.component.html',
  styleUrls: ['./edit-home-post-dialog.component.scss']
})
export class EditHomePostDialogComponent implements OnInit {

  // public nationalities = Object.values(NATIONALITIES);
  // public userTypes = USER_TYPES;
  // public user: User;
  // public userLoggedIn$: Observable<User> = this.store$.select(UserSelectors.selectUser);
  // public userSubscriber: Subscription;
  // public userState$: Observable<UserState> = this.store$.select(UserSelectors.selectUserState);
  // public userStateSubscriber: Subscription;
  // public snackBarSubscription: Subscription;
  public editHomePostForm: FormGroup;
  // public editUserFormValueChangesSubscriber: Subscription;
  // public usersState$: Observable<UsersState> = this.store$.select(UsersSelectors.selectUsersState);
  // public userState$: Observable<UserState> = this.store$.select(UserSelectors.selectUserState);
  // public userTypes$: Observable<UserType[]> = this.store$.select(AppConstantsSelectors.selectUserTypes);
  // public combinedUserUserTypesStateSubscription: Subscription;
  // public userTypes: UserType[];

  constructor(
    // private store$: Store<AppState>,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditHomePostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      title: string;
      body: string
    }
  ) { }

  ngOnInit(): void {

    // this.combinedUserUserTypesStateSubscription = combineLatest([this.userState$, this.userTypes$]).pipe(
    //   filter(([userState, userTypes]) => {
    //     return userState.user != null && userTypes != null;
    //   }),
    //   take(1),
    //   map(([userState, userTypes]) => {
    //     this.userTypes = userTypes.filter(ut => {
    //       if (userState.user.userType.rank != ut.rank) return ut;
    //     })
    //   })
    // ).subscribe();

    this.createForm();
  }

  ngOnDestroy(): void {
    // this.combinedUserUserTypesStateSubscription.unsubscribe();
  }

  createForm() {

    const paragraphReplace = {
      '<p>': '',
      '</p>': '\n'
    }

    this.editHomePostForm = this.fb.group({
      title: [this.data.title, [
        Validators.required,
        Validators.maxLength(200)
      ]],
      body: [this.data.body.replace(/<p>|<\/p>/g, function (matched) {
        return paragraphReplace[matched];
      }), [
        Validators.required,
      ]]
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