import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserType } from '@models/user-type.model';
import { NewUser } from '@models/user.model';
import { UserState } from '@modules/user/store/user.state';
import { Store } from '@ngrx/store';
import { AppState } from '@store/root.state';
import { AppConstantsState } from '@store/app-constants/app-constants.state';
import { dniValidator } from '@validators/dni.validator';
import { drivingLicencesValidator } from '@validators/driving-licences.validator';
import { userTypeValidator } from '@validators/userType.validator';
import { combineLatest, Observable, Subscription } from 'rxjs';
import * as UserSelectors from '@modules/user/store/user.selector';
import * as AppConstantsSelectors from '@store/app-constants/app-constants.selector';
import { filter, map, take } from 'rxjs/operators';

@Component({
  selector: 'app-edit-profile-dialog',
  templateUrl: './edit-profile-dialog.component.html',
  styleUrls: ['./edit-profile-dialog.component.scss']
})
export class EditProfileDialogComponent implements OnInit, OnDestroy {
  public userState$: Observable<UserState> = this.store$.select(UserSelectors.selectUserState);
  public userTypes$: Observable<UserType[]> = this.store$.select(AppConstantsSelectors.selectUserTypes);
  public combinedUserUserTypesStateSubscription: Subscription;
  public userTypes: UserType[];
  public editUserDialogForm: FormGroup;

  constructor(
    private store$: Store<AppState>,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      name: string;
      surname: string;
      email: string;
      userTypeId: number;
      dni: string;
      birthDate: Date;
      addressStreet: string;
      addressNumber: string;
      addressCity: string,
      addressCp: string;
      addressCountry: string;
      phone: string;
      actualPosition: string;
      drivingLicences: string;
    }
  ) { }

  ngOnInit(): void {

    this.combinedUserUserTypesStateSubscription = combineLatest([this.userState$, this.userTypes$]).pipe(
      filter(([userState, userTypes]) => {
        return userState.user != null && userTypes != null;
      }),
      take(1),
      map(([userState, userTypes]) => {
        // if (userState.user.userType.rank == 1) {
        //   this.userTypes = userTypesState.userTypes;
        // }
        // else {
        this.userTypes = userTypes.filter(ut => {
          if (userState.user.userType.rank != ut.rank) return ut;
        })
        console.log(this.userTypes)
        // }

      })
    ).subscribe();


    this.editUserDialogForm = this.formBuilder.group({
      name: [this.data.name, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(55)
      ]],
      surname: [this.data.surname, [
        Validators.minLength(3),
        Validators.maxLength(55)
      ]],
      email: [this.data.email, [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
      ]],
      birthDate: [this.data.birthDate],
      phone: [this.data.phone, [
        Validators.minLength(9),
        Validators.maxLength(15),
      ]],
      addressNumber: [this.data.addressNumber, [
        Validators.maxLength(50)
      ]],
      addressStreet: [this.data.addressStreet, [
        Validators.maxLength(70)
      ]],
      addressCity: [this.data.addressCity, [
        Validators.maxLength(50)
      ]],
      addressCp: [this.data.addressCp, [
        Validators.maxLength(10)
      ]],
      addressCountry: [this.data.addressCountry, [
        Validators.maxLength(50)
      ]],
      dni: [this.data.dni, [
        dniValidator
      ]],
      userTypeId: [this.data.userTypeId, [
        userTypeValidator
      ]],
      drivingLicences: [this.data.drivingLicences, [
        Validators.maxLength(100),
        drivingLicencesValidator
      ]],
      actualPosition: [this.data.actualPosition, [
        Validators.maxLength(100),
      ]]
    })
  }

  ngOnDestroy() {
    this.combinedUserUserTypesStateSubscription.unsubscribe();
  }

  onCloseDialog(): void {
    this.dialogRef.close();
  }

  submit(): void {
    this.dialogRef.close(this.editUserDialogForm.value);
  }

}
