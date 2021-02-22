import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as UserSelectors from '@modules/user/store/user.selector';
import { UserState } from '@modules/user/store/user.state';
import { Store } from '@ngrx/store';
import { AppState } from '@store/root.state';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-avatar-dialog',
  templateUrl: './avatar-dialog.component.html',
  styleUrls: ['./avatar-dialog.component.scss']
})
export class AvatarDialogComponent implements OnInit {

  public userState$: Observable<UserState> = this.store$.select(UserSelectors.selectUserState);
  public avatarDialogForm: FormGroup;
  public deleteAvatarSubscription: Subscription;

  constructor(
    private store$: Store<AppState>,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AvatarDialogComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: {
    //   name: string;
    //   finishDate: Date;
    //   finished: boolean;
    // } | null
  ) { }

  ngOnInit(): void {

    this.avatarDialogForm = this.formBuilder.group({
      newAvatar: [null, [
        Validators.required,
      ]
      ],
      deleteAvatar: [false, [
        Validators.required
      ]],

    })

    this.deleteAvatarSubscription = this.avatarDialogForm.get('deleteAvatar').valueChanges.pipe(
      tap(deleteAvatar => {
        if (deleteAvatar || this.deleteAvatar.invalid) this.newAvatar.disable();
        else this.newAvatar.enable();
      })
    ).subscribe();

  }

  ngOnDestroy() {
    this.deleteAvatarSubscription.unsubscribe();
  }

  onCloseDialog(): void {
    this.dialogRef.close();
  }

  submit(): void {

    this.dialogRef.close({
      newAvatar: this.newAvatar.value,
      deleteAvatar: this.deleteAvatar.value,
    });
  }

  get newAvatar() { return this.avatarDialogForm.get('newAvatar') }
  get deleteAvatar() { return this.avatarDialogForm.get('deleteAvatar') }

}
